import { useSelector, useDispatch } from 'react-redux'
import { updateFoodOrderByIndex, updateOrderInfo, clearOrder } from '../features/orderSlice'
import { usePostOrderMutation, useGetTimeSlotsQuery } from '../features/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import LoadingSpinner from './LoadingSpinner'
import DeleteDropdown from './DeleteDropdown'
import Select from 'react-select'
import Toggle from 'react-toggle'
import { IoIosArrowBack } from 'react-icons/io'
import Backdrop from './Backdrop'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

const Cart = ({closeCart}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order = useSelector(state => state.order)
  const [ postOrder, results ] = usePostOrderMutation()
  const { data, refetch, isLoading, isError, error } = useGetTimeSlotsQuery()
  const [ showDeleteItemIndex, setShowDeleteItemIndex ] = useState(null) 
  const [ utensils, setUtensils ] = useState(false)
  const [ pickupTimes, setPickupTimes ] = useState(data ? data.map(item => {
    return{
      value: item,
      label: item.time
    }
  }) : [])

  const selectStyle = {
    option: (styles, {data, isFocused, isSelected}) => ({
      ...styles,
      backgroundColor: isSelected ? '#F8F8FF' : data.color,
      color: 'black',
      "&:active": {
        backgroundColor: '#DCDCDC'
      }
    }),
    control: (styles, {data, isFocused, isSelected}) => ({
      ...styles,
      boxShadow: 0,
      borderColor: isFocused ? 'grey' : 'lightgrey',
      "&:hover": {
        borderColor: 'none'
      }
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
  
  const handleQuantityChange = (event, item, index, action) => {
    event.preventDefault()

    const updatedItem = {...item}
    if(action === 'add'){
      dispatch(updateFoodOrderByIndex({
        index: index,
        updatedFood: {
        ...updatedItem,
        quantity: updatedItem.quantity + 1
        }
      }))
    }

    //  subract quantity by 1
    else{
      if(updatedItem.quantity === 1){
        setShowDeleteItemIndex(index)
      }
      else{
        dispatch(updateFoodOrderByIndex({
          index: index,
          updatedFood: {
          ...updatedItem,
          quantity: updatedItem.quantity - 1
          }
        }))
      }
    }
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
      <motion.div 
        className='cart' 
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
        <div className='cart-back-btn' onClick={closeCart}> 
          <IoIosArrowBack fontSize='1.5rem'/>
        </div>
        <h1>ORDER SUMMARY</h1>
        <div className='cart-input'>
          <input name='name' type='text' value={order.name} placeholder='Name (required)' onChange={(e)=>handleChange(e)}/>
          <input name='telephoneNum'type='tel' value={order.telephoneNum} placeholder='Phone Number (required)' onChange={(e)=>handleChange(e)}/>
          <textarea name='specialInstructions' type='text' value={order.specialInstructions} placeholder='Add special instructions here...' onChange={(e)=>handleChange(e)} rows={3}/>
          <div className='pickuptime-select'>
            <Select 
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
        <div className='cart-items-container'>
          <div className='cart-items-header'>
            Your Items :
          </div>
          <div className="cart-items">
            {order.foodOrderArr.length === 0 && 
              <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                >
                  ..Your order is looking a little empty, start by adding some items
              </motion.p>
            }
              {order.foodOrderArr.map((item, index) => (
                <div
                  className="cart-item" 
                  key={index}
                >
                  <div>
                    <div className='cart-item-header'>
                      {item.food.name}
                      <div className='icon'>
                        <DeleteDropdown
                          index={index} 
                          showDeleteItemIndex={showDeleteItemIndex}
                          setShowDeleteItemIndex={setShowDeleteItemIndex}
                        />
                      </div>
                    </div>
                    {(item.food.price_lg !== null || item.note) && 
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
                      </div>
                    }
                  </div>
                  <div className='cart-item-footer'>
                    <motion.div 
                      className='quantity-container'
                      whileTap={{scale: 0.9}}
                    >
                      <div className='quantity-btn' onClick={(e)=>handleQuantityChange(e, item, index, 'sub')}>
                        <AiOutlineMinus />
                      </div>
                      <div className='quantity'> 
                        {item.quantity}
                      </div>
                      <div 
                        className='quantity-btn' 
                        onClick={(e)=>handleQuantityChange(e, item, index, 'add')}
                      >
                        <AiOutlinePlus />
                      </div>
                    </motion.div>
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
      </motion.div>
    </Backdrop>
  )
}

export default Cart