import { useState } from 'react'
import ModalViewOrder from './ModalViewOrder'
import Dropdown from './Dropdown'
import { motion, AnimatePresence } from 'framer-motion'

const Order = ({orderItem, dropdownObjId, setDropdownObjId}) => {
  const createdAt = new Date(orderItem.createdAt)
  const [modalViewOrder, setModalViewOrder] = useState(false)
  const formattedTime = (orderItem.pickUpTime.slice(0, 2) % 12).toString().concat(':', orderItem.pickUpTime.slice(2,4), orderItem.pickUpTime.slice(0, 2) > 12 ? ' PM' : ' AM')

  return (
    <motion.div 
      className='order'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}
    >
      <div className='order-header'> 
        <p>{orderItem.name}</p>
        <Dropdown 
          orderItem={orderItem} 
          setModalViewOrder={setModalViewOrder}
          dropdownObjId={dropdownObjId}
          setDropdownObjId={setDropdownObjId}
        />
      </div>
      <p>{orderItem.telephoneNum}</p>
      <AnimatePresence> 
        {modalViewOrder && 
          <ModalViewOrder 
            orderItem={orderItem} 
            closeModal={()=>setModalViewOrder(false)} 
          />
        }
      </AnimatePresence>
      <p>Pick up time: {formattedTime}</p>
      <p>Posted at: {createdAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
    </motion.div>
  )
}

export default Order