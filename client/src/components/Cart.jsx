import { useDispatch } from 'react-redux'
import { deleteFoodItemByIndex, updateOrderInfo, clearOrder } from '../features/orderSlice'
import { usePostOrderMutation, useGetTimeSlotsQuery } from '../features/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { AiOutlineClose } from 'react-icons/ai'
import Select from 'react-select'
import Toggle from 'react-toggle'
import { IoIosArrowBack } from 'react-icons/io'
import Backdrop from './Backdrop'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import EditItemModal from './EditItemModal'
import { useMediaQuery } from 'react-responsive'

const Cart = ({closeCart, order}) => {
  const isMobile = useMediaQuery({maxWidth: 768})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ postOrder, results ] = usePostOrderMutation()
  const { data, refetch, isLoading, isError, error } = useGetTimeSlotsQuery()
  const [ showDeleteItemIndex, setShowDeleteItemIndex ] = useState(null) 
  const [ utensils, setUtensils ] = useState(false)
  const [ openEditModalIndex, setOpenEditModalIndex ] = useState(null)
  const [ pickupTimes, setPickupTimes ] = useState(data ? data.map(item => {
    return{
      value: item,
      label: item.time
    }
  }) : [])

  const selectStyle = {
    option: (styles, {data, isSelected}) => ({
      ...styles,
      backgroundColor: isSelected ? '#F8F8FF' : data.color,
      color: 'black',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      "&:active": {
        backgroundColor: '#DCDCDC'
      }
    }),
    control: (styles, {isFocused}) => ({
      ...styles,
      boxShadow: isFocused ? "0 0 5px rgba(81, 203, 238, 1)" : 0,
      borderColor: isFocused ? "rgba(81, 203, 238, 1)" : 'lightgrey',
      fontSize: '0.9rem',
      padding: '0.25rem 0.25rem',
      "&:hover": {
        borderColor: 'none'
      },
    })
  }

  useEffect(() => {
    // refetches time slots every 3 mins
    setInterval(refetch, 180000)
  }, [])

  useEffect(() => {
    if(results.isSuccess){
      toast.success('Your order has been successfully placed!')
      results.reset()
      dispatch(clearOrder())
      setUtensils(false)
      closeCart()
      navigate('/')
      return
    }
    if(results.isError){
      toast.error("An error has occured, please try again.")
      results.reset()
      return
    }
  }, [results])

  useEffect(() => {
    setPickupTimes( data ?
      data.filter(timeSlot => timeSlot.active).map(item => {
        const formattedTime = (item.time.slice(0, 2) % 12).toString().concat(':', item.time.slice(2,4), item.time.slice(0, 2) > 12 ? ' PM' : ' AM')
        return{
          value: item,
          label: formattedTime
        }
      }) : null
    ) 
  }, [data])

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    dispatch(updateOrderInfo({
      [name]: value
    }))
  }

  const handlePickupTimeChange = (event) => {
    const { time } = event.value
    dispatch(updateOrderInfo({
      ...order,
      pickUpTime: time
    }))
  }
  
  const handleDelete = (event, index) => {
    event.preventDefault()
    dispatch(deleteFoodItemByIndex(index))
    toast.info('Item has been deleted', {autoClose: 1500, hideProgressBar: true})
  }

  const handleSubmitOrder = (event) => {
    event.preventDefault()
    if(order.foodOrderArr.length < 1){
      toast.error('Please add some items to the cart!')
      return
    }
    if(!order.name || !order.telephoneNum){
      toast.error('Please fill in all required fields!')
      return
    }
    if(!order.pickUpTime){
      toast.error('Please select a pick up time!')
      return
    }
    postOrder({
      ...order,
      utensils: !utensils ? 0 : order.utensils,
      status: 'pending',  
      complete: false,
    })
  }

  const computeSizeToString = (size) => {
    if(size === 2){
      return 'large'
    } else if(size === 1){
      return 'small'
    }
  }

  if(results.isLoading){
    return <LoadingSpinner />
  }

  return (
    <Backdrop onClick={closeCart}>
      <AnimatePresence>
        {openEditModalIndex !== null && 
          <EditItemModal 
            item={order.foodOrderArr[openEditModalIndex]} 
            closeModal={()=>setOpenEditModalIndex(null)}
            index={openEditModalIndex}
          />
        }
      </AnimatePresence>
      <motion.div 
        className={`cart ${openEditModalIndex === null ? '' : 'edit-item'}`} 
        onClick={(e) => e.stopPropagation()}
        initial={{
          x: "100vw",
        }}
        animate={{
          x: "0",
          transition: {
            type: 'inhertia',
            duration: 0.5,
          },
        }}
        exit={{ 
          x: "100vw",
        }}
      >
        <div className='cart-header'> 
          <IoIosArrowBack 
            className='icon'
            fontSize='1.5rem'
            onClick={closeCart}
          />
          <div>Phnom Penh Restaurant</div>
        </div>
        <div className='cart-items-container'>
          <div className='cart-items-header'>
            Your Items
          </div>
          <div className="cart-items">
            {order.foodOrderArr.length === 0 && 
              <motion.div
                className='cart-items-empty-message'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                >
                Your order is looking a little empty, start by adding some items from the menu...
              </motion.div>
            }
              {order.foodOrderArr.map((item, index) => (
                <div
                  className="cart-item" 
                  key={index}
                >
                  <div>
                    <div className='cart-item-header'>
                      {item.food.name}
                      <AiOutlineClose
                        className='icon' 
                        fontSize='1rem'
                        onClick={(e)=>handleDelete(e, index)}
                      />
                    </div>
                    <div className='note'>
                      {item.food.price_lg !== null &&  
                        <div>
                          + size: {computeSizeToString(item.size)}
                        </div>
                      }
                      {item.note && 
                        <div>
                          + note: {item.note}
                        </div>
                      }
                      <div> 
                        + quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className='cart-item-footer'>
                    <motion.button 
                      className='cart-item-edit-btn'
                      onClick={()=>setOpenEditModalIndex(index)}
                      whileTap={{scale: 0.9}}
                    >
                      Edit
                    </motion.button>
                    <div>${item.foodTotal.toFixed(2)}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='cart-prices'>
          <div className='subtotal'>
            <div>Subtotal:</div>
            <div>${order.orderSubTotal.toFixed(2)}</div>
          </div>
          <div className='gst'>
            <div>GST (5%):</div>
            <div>${(order.orderSubTotal * 0.05).toFixed(2)}</div>
          </div>
          <div className='total'>
            <div>Total:</div>
            <div>${((order.orderSubTotal * 0.05) + order.orderSubTotal).toFixed(2)}</div>
          </div>
        </div>
        <div className='cart-input'>
          <div className='cart-input-header'>Order Details</div>
          <input name='name' type='text' value={order.name} placeholder='Name (required)' onChange={(e)=>handleChange(e)}/>
          <input name='telephoneNum'type='tel' value={order.telephoneNum} placeholder='Phone Number (required)' onChange={(e)=>handleChange(e)}/>
          <textarea name='specialInstructions' type='text' value={order.specialInstructions} placeholder='Add special instructions here...' onChange={(e)=>handleChange(e)} rows={4}/>
          <div className='pickuptime-select'>
            <Select
              menuPlacement={isMobile ? 'auto' : 'top'} 
              isSearchable={false}
              placeholder='Please select a pickup time (required) ...'
              value={order.pickUpTime === '' ? '' : {
                value: order.pickUpTime,
                label: (order.pickUpTime.slice(0, 2) % 12).toString().concat(':', order.pickUpTime.slice(2,4), order.pickUpTime.slice(0, 2) > 12 ? ' PM' : ' AM')
              }}
              options={pickupTimes} 
              noOptionsMessage={() => 'Sorry, no pickup times available right now'}
              onChange={(e) => handlePickupTimeChange(e)}
              styles={selectStyle}
            />
          </div>
          <div className='utensils-container'>
            <label>
              Utensils
              <Toggle 
                checked={utensils} 
                onChange={(e) => setUtensils(e.target.checked ? true : false)}
              />
            </label>
            <AnimatePresence> 
              {utensils && 
                <motion.label
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                >
                  <input name='utensils' type='number' min='0' value={order.utensils} onChange={e=>handleChange(e)}/> 
                  sets
                </motion.label>
              } 
            </AnimatePresence>
          </div>
        </div>
        <div className='cart-footer'>
          {isMobile && 
            <motion.button
              className='cart-footer-btn'
              onClick={closeCart}
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
            > 
              Menu
            </motion.button>
          }
          <motion.button 
            className='place-order-btn'
            onClick={(e)=>handleSubmitOrder(e)}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
          >
            <span>
              Place Order
            </span>
          </motion.button>
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default Cart