import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToOrder } from '../features/orderSlice'
import { IoClose } from 'react-icons/io5'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Select from 'react-select'
import { motion } from 'framer-motion'
import Backdrop  from './Backdrop'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

const MenuItemModal = ({menuItem, closeModal}) => {

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
  
  const mobileVariants = {
    visible: { 
      y: 0,
      transition: {
        type: 'inhertia',
        duration: 0.5,
      },
     },
    hidden: { y: '100vh'},
    exit: { y: '100vh'},
  }

  const desktopVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      }
    },
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  }
  const isMobile = useMediaQuery({maxWidth: 768})
  const dispatch = useDispatch()
  const sizeOptions = [
    {label: 'Large', value: menuItem.price_lg, id: 2},
    {label: 'Small', value: menuItem.price_md, id: 1}, 
  ]

  const initialFoodOrder = {
    size: 1,
    singleUnitPrice: menuItem.price_md,
    food: menuItem,
    quantity: 1,
    note: '',
    foodTotal: menuItem.price_md,
  }

  const [ size, setSize ] = useState({label: 'Small', value: menuItem.price_md, id: 1})
  const [ foodOrder, setFoodOrder ] = useState(initialFoodOrder)

  useEffect(() => {
    setSize({label: 'Small', value: menuItem.price_md, id: 1})
    setFoodOrder(initialFoodOrder)
  }, [menuItem])

  useEffect(() => {
    setFoodOrder((prev) => {
      return{
        ...prev,
        size: size.id,
        singleUnitPrice: size.value,
        foodTotal: foodOrder.quantity * size.value,
      }
    })
  }, [foodOrder.quantity, size.value])

  const closeMenuItemModal = (event) => {
    event.preventDefault()
    closeModal()
    setSize({label: 'Small', value: menuItem.price_md, id: 1})
    setFoodOrder(prev => {
      return{
        ...prev,
        size: 1,
        quantity: 1,
        foodTotal: menuItem.price_md,
        note: '',
      }
    })
  }

  const handleOnChangeNote = (event) => {
    event.preventDefault()
    setFoodOrder(prev => {
      return{
        ...prev,
        note: event.target.value
      }
    })
  }


  const handleAddtoOrder = (event) => {
    event.preventDefault()
    dispatch(addToOrder(foodOrder))
    closeMenuItemModal(event)
    toast.info("Item has been added to your cart.", {
       theme: "colored",
       autoClose: 1500,
       hideProgressBar: true,
      })
  }


  return (
    <Backdrop 
      onClick={closeModal} 
      addClass={isMobile ? 'bottom' : 'center'}
    >
      <motion.div 
        className='menu-item-modal-content'
        onClick={(e) => e.stopPropagation()}
        variants={isMobile ? mobileVariants : desktopVariants}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
      >
          <div className='menu-item-modal-header'>
            <IoClose className='icon-btn' fontSize='1.7rem' onClick={closeModal} />
          </div>
          <div className='menu-item-modal-body'>
            <div className='menu-item-modal-body-name-desc'>
              <div className='name'>{menuItem.name}</div>
              {menuItem.desc && 
                <div className='desc'>
                  {menuItem.desc}
                </div>
              }
            </div>
            <textarea 
              type='text' 
              value={foodOrder.note} 
              onChange={handleOnChangeNote} 
              placeholder='...add additional notes here'
              rows={3}
            />
            {menuItem.price_lg && 
              <div className='size-select'>
                <Select
                  isSearchable={false}
                  value={size}
                  onChange={setSize}
                  options={sizeOptions}
                  styles={selectStyle}
                />
              </div>
            }
          </div>
          <div className='menu-item-modal-footer'>
            <motion.div 
              className='quantity-container'
              whileTap={{scale: 0.9}}
            >
              <div 
                className='quantity-btn' 
                onClick={()=>setFoodOrder(prev => {
                  if(prev.quantity === 1){
                    return prev
                  }
                  return{
                    ...prev,
                    quantity: prev.quantity - 1
                  }
                })}
              > 
                <AiOutlineMinus />
              </div>
              <div className='quantity'> 
                {foodOrder.quantity}
              </div>
              <div className='quantity-btn' onClick={()=>setFoodOrder(prev => {
                return{
                  ...prev,
                  quantity: prev.quantity + 1
                }})
              }> 
                <AiOutlinePlus />
              </div>
            </motion.div>
            <div className='food-total'>
              Price: ${parseFloat(foodOrder.foodTotal).toFixed(2)}
            </div>
          </div>
          <div className='menu-item-modal-btns'>
            <motion.button 
              onClick={(e)=>handleAddtoOrder(e)}
              whileTap={{scale: 0.9}}
              whileHover={{scale: 1.1}}
            >
              Add
            </motion.button>
            <motion.button 
              onClick={closeMenuItemModal}
              whileTap={{scale: 0.9}}
              whileHover={{scale: 1.1}}
            >
              Cancel
            </motion.button>
          </div>
      </motion.div>
    </Backdrop>
  )
}

export default MenuItemModal