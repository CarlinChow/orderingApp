import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateFoodOrderByIndex } from '../features/orderSlice'
import { IoClose } from 'react-icons/io5'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Select from 'react-select'
import { motion } from 'framer-motion'
import Backdrop  from './Backdrop'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'


const EditItemModal = ({item, closeModal, index}) => {
  const selectStyle = {
    option: (styles, {data, isSelected}) => ({
      ...styles,
      backgroundColor: isSelected ? '#F8F8FF' : data.color,
      color: 'black',
      "&:active": {
        backgroundColor: '#DCDCDC'
      }
    }),
    control: (styles, {isFocused}) => ({
      ...styles,
      boxShadow: 0,
      borderColor: isFocused ? 'grey' : 'lightgrey',
      "&:hover": {
        borderColor: 'none'
      }
    })
  }
  
  // MODAL ANIMATIONS
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
      y: '100vh',
      opacity: 0,
    },
    exit: {
      y: '-100vh',
      opacity: 0,
    },
  }

  const isMobile = useMediaQuery({maxWidth: 768})
  const dispatch = useDispatch()
  const sizeOptions = [
    {label: 'Large', value: item.food.price_lg, id: 2},
    {label: 'Small', value: item.food.price_md, id: 1}, 
  ]

  const [ size, setSize ] = useState(item.size === 1 ? sizeOptions[1] : sizeOptions[0])
  const [ foodOrder, setFoodOrder ] = useState(item)

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

  const handleOnChangeNote = (event) => {
    event.preventDefault()
    setFoodOrder(prev => {
      return{
        ...prev,
        note: event.target.value
      }
    })
  }

  const handleUpdateOrder = (event, index) => {
    event.preventDefault()
    dispatch(updateFoodOrderByIndex({updatedFood: foodOrder, index: index}))
    toast.info("Item has been updated!", {autoClose: 1500, hideProgressBar: true})
    closeModal()
  }

  return (
    <Backdrop
      addClass='high-z-index bottom'
      onClick={closeModal}
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
              <div className='name'>{item.food.name}</div>
              {item.food.desc && 
                <div className='desc'>
                  {item.food.desc}
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
            {item.food.price_lg && 
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
              onClick={(e)=>handleUpdateOrder(e, index)}
              whileTap={{scale: 0.9}}
              whileHover={{scale: 1.1}}
            >
              Update
            </motion.button>
            <motion.button 
              onClick={closeModal}
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

export default EditItemModal