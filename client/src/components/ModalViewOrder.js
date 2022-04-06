import {  AiFillMessage, AiOutlineClose } from 'react-icons/ai'
import {  FaUtensils  } from 'react-icons/fa'
import Button from './Button'
import Backdrop from './Backdrop'
import { motion } from 'framer-motion'

const ModalViewOrder = ({orderItem, closeModal}) => {
  const createdAt = new Date(orderItem.createdAt)
  const formattedTime = (orderItem.pickUpTime.slice(0, 2) % 12).toString().concat(':', orderItem.pickUpTime.slice(2,4), orderItem.pickUpTime.slice(0, 2) > 12 ? ' PM' : ' AM')

  // compute size integer value to a string (S, L)
  const computeSizeToString = (size) => {
    if(size === 2){
      return 'large'
    } else if(size === 1){
      return 'small'
    }
  }

  return (
    <Backdrop
      onClick={closeModal}
      addClass={'center'}
    >
      <motion.div 
        className='modal-content' 
        onClick={e => e.stopPropagation()}
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        exit={{x: '100vw'}}
      >
        <div className='modal-close-btn'> 
          <AiOutlineClose 
            fontSize={'1.4rem'} 
            onClick={closeModal} 
            cursor='pointer'
          />
        </div>
        <div className='modal-header'>  
          <h1>{orderItem.name}</h1>
          <h1>{orderItem.telephoneNum}</h1>
        </div>
        <div className='modal-date'> 
          <p>{createdAt.toLocaleDateString()}</p>
          <p>{createdAt.toLocaleTimeString()}</p>
        </div>
        <div className='modal-pickup-time'> 
          <p>Pick Up Time: {formattedTime}</p>
        </div>
        <div className='modal-body'>
          <div className='modal-body-header'>
            <p>Item</p>
            <p>Price</p>
          </div>
          <div className='modal-food-items'> 
            {orderItem.foodOrderArr.map((foodItem, index) => (
              <div 
                className='modal-food-item-container'
                key={index}
              >
                <div className='modal-food-item'>
                  <div className='modal-food'>
                    <p>{foodItem.quantity}</p>  
                    <p style={{fontWeight: '600'}}>{foodItem.food.name}</p>
                  </div>
                  <div className='modal-food-price'>
                    <p>{`${foodItem.foodTotal.toFixed(2)}`}</p>
                  </div>
                </div>
                {(foodItem.food.price_lg !== null || foodItem.note) && 
                  <div className='modal-food-note'>
                    {foodItem.food.price_lg !== null &&  
                      <div>
                        + size: {computeSizeToString(foodItem.size)}
                      </div>
                    }
                    {foodItem.note && 
                      <div>
                        + note: {foodItem.note}
                      </div>
                    }
                  </div>
                }
            </div>
          ))}
          </div> 
        </div>
        <div className='modal-prices'>
          <div className='modal-price'>
            <p>SubTotal:</p>
            <p>{`$${orderItem.orderSubTotal.toFixed(2)}`}</p>
          </div>
          <div className='modal-price'>
            <p>GST:</p>
            {/* add calculations later */}
            <p>{`$${(orderItem.orderSubTotal * 0.05).toFixed(2)}`}</p>
          </div>
          <div className='modal-price grand-total'>
            <p>GrandTotal:</p>
            <p>{`$${(orderItem.orderSubTotal + (orderItem.orderSubTotal * 0.05)).toFixed(2)}`}</p>
          </div>     
        </div>
        <div className='modal-footer'>
          <div className='modal-footer-item'>
            <AiFillMessage fontSize='1.7rem'/>
            <p>{orderItem.specialInstructions ? `"${orderItem.specialInstructions}"`: 'n/a'}</p>
          </div> 
          <div className='modal-footer-item'> 
            <FaUtensils fontSize='1.7rem'/>
            <p>{orderItem.utensils > 0 ? `${orderItem.utensils} sets`: 'none'}</p>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default ModalViewOrder