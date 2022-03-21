import { deleteFoodItemByIndex } from '../features/orderSlice'
import { useDispatch } from 'react-redux'
import Button from './Button'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineClose } from 'react-icons/ai'

const DeleteDropdown = ({showDeleteItemIndex, index, setShowDeleteItemIndex}) => {
  const dispatch = useDispatch()
  const variants = {
    open: { opacity: 1, x: 0},
    closed: { opacity: 0, x: '100%'}
  }

  const handleDelete = () => {
    setShowDeleteItemIndex(null)
    dispatch(deleteFoodItemByIndex(index))
  }

  return (
    <div 
      className='delete-dropdown'
      onClick={e => e.stopPropagation()}
    >
      <AiOutlineClose 
        onClick={()=>setShowDeleteItemIndex(index === showDeleteItemIndex ? null : index)}
      />
      <AnimatePresence>
        {showDeleteItemIndex === index &&
            <motion.div 
              className='delete-dropdown-menu'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className='delete-dropdown-body'> 
                Are you sure you want to delete this item from your order?
              </div>
              <div className='delete-dropdown-footer'>
                <Button text='Delete' color='crimson' onClick={handleDelete}/>
                <Button text='Cancel' color='grey' onClick={()=>setShowDeleteItemIndex(null)}/>
              </div>
            </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default DeleteDropdown