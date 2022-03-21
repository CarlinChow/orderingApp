import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToOrder } from '../features/orderSlice'
import { IoChevronBackSharp, IoClose } from 'react-icons/io5'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import Select from 'react-select'
import Button from './Button'
import { motion } from 'framer-motion'
import Backdrop  from './Backdrop'

const MenuItemModal = ({menuItem, closeModal}) => {
  const variants = {
    
  }
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
  }


  return (
    <Backdrop 
      onClick={closeModal} 
      addClass='center'
    >
      <motion.div 
        className='menu-item-modal-content'
        onClick={(e) => e.stopPropagation()}
        initial={{
          // scale: 0,
          y: '100vh',
          opacity: 0,
        }}
        animate={{
          // scale: 1,
          y: 0,
          opacity: 1,
        }}
        exit={{
          // scale: 0,
          y: '-100vh',
          opacity: 0,
        }}
      >
          <div className='menu-item-modal-header'>
            <IoChevronBackSharp className='icon-btn' fontSize='1.5rem' onClick={closeModal}/>
            <IoClose className='icon-btn' fontSize='1.7rem' onClick={closeModal} />
          </div>
          <div className='menu-item-modal-body'>
            <div className='name'>{menuItem.name}</div>
            {menuItem.desc && 
              <div className='desc'>
                {`~${menuItem.desc}`}
              </div>
            }
            <textarea 
              type='text' 
              value={foodOrder.note} 
              onChange={handleOnChangeNote} 
              placeholder='...add additional notes here'
              rows={3}
            />
            {menuItem.price_lg && 
              <Select
                value={size}
                onChange={setSize}
                options={sizeOptions}
              />
            }
          </div>
          <div className='menu-item-modal-footer'>
            <motion.div 
              className='quantity-container'
              whileTap={{scale: 0.9}}
            >
              <div className='quantity-btn' onClick={()=>setFoodOrder(prev => {
                if(prev.quantity === 1){
                  return prev
                }
                return{
                  ...prev,
                  quantity: prev.quantity - 1
                }
              })}> 
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
            <Button text='Add' color='steelblue' onClick={(e)=>handleAddtoOrder(e)}/>
            <Button text='Cancel' color='grey' onClick={closeMenuItemModal}/>
          </div>
      </motion.div>
    </Backdrop>
  )
}

export default MenuItemModal