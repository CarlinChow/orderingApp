import '../public.css'
import Menu from '../components/Menu'
import Cart from '../components/Cart'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'


const CustomerOrderPage = () => {
  const order = useSelector(state => state.order)
  const [ showCart, setShowCart ] = useState(false)
  const isMobile = useMediaQuery({maxWidth: 992})

  return (
    <div className='customer-page'>
      {!isMobile && 
        <div className='customer-page-header'> 
        Phnom Penh Restaurant
        </div>
      }
      <Menu order={order}/>
      {order.numOfItems > 0 && 
        <>
        <div className='customer-page-footer'>
          {isMobile && 
            <div className='item-counter'>
              <div>{order.numOfItems > 1 ? `${order.numOfItems} Items` : '1 Item'}</div>
              <div>In Order</div>
            </div>
          }
          <motion.button 
            className='show-cart-btn'
            onClick={()=>setShowCart(true)}
            whileHover={!isMobile ? { 
              backgroundColor: '#808080',
              color: '#FFFFFF',
            }: null }
            whileTap={{ scale: 0.8 }}
          >
             {`Show Cart | $${order.orderSubTotal.toFixed(2)}`}
          </motion.button>
        </div>
        </>
      }
      <AnimatePresence> 
        {showCart && 
          <Cart 
            isMobile={isMobile}
            order={order}
            closeCart={()=>setShowCart(false)}
          />
        }
      </AnimatePresence>
    </div>
  )
}

export default CustomerOrderPage