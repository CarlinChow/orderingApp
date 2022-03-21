import Button from './Button'
import { motion } from 'framer-motion'
import { useDeleteOrderMutation } from '../features/api'

const DeleteOrderDropdown = ({closeDropdown, orderItem}) => {
  const [ deleteOrder, results ] = useDeleteOrderMutation()

  const handleDelete = async() => {
    await deleteOrder(orderItem._id)
    closeDropdown()
  }
  const handleCancel = () => {
    closeDropdown()
  }

  return (
      <div className='delete-order-dropdown-container'>
        <motion.div 
          className='delete-order-dropdown' 
          onClick={(e)=>e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='delete-order-dropdown-body'> 
              Are you sure you want to delete this order from "{orderItem.name}" ?
          </div>
          <div className='delete-order-dropdown-footer'>
            <Button text='Cancel' color='grey' onClick={handleCancel}/>
            <Button text='Delete' color='crimson' onClick={handleDelete}/>
          </div>
        </motion.div>
      </div>
  )
}

export default DeleteOrderDropdown