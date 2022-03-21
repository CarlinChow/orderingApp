import '../public.css'
import Menu from '../components/Menu'
import Cart from '../components/Cart'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'


const CustomerOrderPage = () => {
  const [ showCart, setShowCart ] = useState(false)
  const isMobile = useMediaQuery({maxWidth: 768})

  return (
    <div className='customer-page'>
      {!isMobile && 
        <div className='customer-page-header'> 
        Phnom Penh Restaurant
        </div>
      }
      <Menu />
      <div className='customer-page-footer'>
        <motion.button 
          className='show-cart-btn'
          onClick={()=>setShowCart(true)}
          whileHover={{ 
            backgroundColor: '#808080',
            color: '#FFFFFF',
          }}
          whileTap={{ scale: 0.8 }}
        >
          Show Cart
        </motion.button>
      </div>
      <AnimatePresence> 
        {showCart && <Cart showCart={showCart} closeCart={()=>setShowCart(false)}/>}
      </AnimatePresence>
    </div>
  )
}

export default CustomerOrderPage