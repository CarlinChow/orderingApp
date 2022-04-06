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
    >
      <AnimatePresence> 
        {modalViewOrder && 
          <ModalViewOrder 
            orderItem={orderItem} 
            closeModal={()=>setModalViewOrder(false)} 
          />
        }
      </AnimatePresence>
      <div className='order-header'> 
        {orderItem.name}
        <Dropdown 
          orderItem={orderItem} 
          setModalViewOrder={setModalViewOrder}
          dropdownObjId={dropdownObjId}
          setDropdownObjId={setDropdownObjId}
        />
      </div>
      <div>{orderItem.telephoneNum}</div>
      <div>Pick up time: {formattedTime}</div>
      <div>Posted at: {createdAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</div>
    </motion.div>
  )
}

export default Order