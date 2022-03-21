import { GrRevert } from 'react-icons/gr'
import { MdLibraryAddCheck } from 'react-icons/md'
import { FaExpandAlt } from 'react-icons/fa'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { AiFillDelete, 
  AiOutlineFileDone 
} from 'react-icons/ai'
import { motion } from 'framer-motion'
import{ useUpdateOrderMutation,} from '../features/api'


const DropdownMenu = ({closeDropdown, orderItem, setModalViewOrder, setIsOpen}) => {
  const [updateOrder, updateResults] = useUpdateOrderMutation()

  const handleViewOrder = (e) => {
    e.stopPropagation()
    setModalViewOrder(true)
    closeDropdown()
  }

  const processOrder = async (e, orderItem) => {
    e.stopPropagation()
    let newStatus = orderItem.status
    if(orderItem.status === 'pending'){
      newStatus = 'in progress' 
    } else if(orderItem.status === 'in progress'){
      newStatus = 'ready'
    } else if(orderItem.status === 'ready'){
      newStatus = 'fullfilled'
    }

    await updateOrder({
      ...orderItem,
      status: newStatus,
    })

    if(updateResults.isError){
      alert(`An Error Occured: ${updateResults.error.message}`)
      return
    }

    closeDropdown()
  }

  const handleRevertOrder = async (e, orderItem) => {
    e.stopPropagation()
    let newStatus = orderItem.status
    if(orderItem.status === 'fullfilled'){
      newStatus = 'ready' 
    } else if(orderItem.status === 'in progress'){
      newStatus = 'pending'
    } else if(orderItem.status === 'ready'){
      newStatus = 'in progress'
    }
    
    await updateOrder({
      ...orderItem,
      status: newStatus,
    })

    closeDropdown()
  }

  const handleDeleteOrder = (event) => {
    event.stopPropagation()
    setIsOpen(true)
    closeDropdown()
  }

  return (
    <div className='dropdown'>
      <motion.div 
        className='dropdown-menu'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.3}}
      >
        <div className='dropdown-item' onClick={(e)=>handleViewOrder(e)}>
          <FaExpandAlt fontSize={'1.2rem'}/> View
        </div>
        {   orderItem.status === 'fullfilled' ? <></>
          : orderItem.status === 'pending' ? 
            <div className="dropdown-item" onClick={(e)=>processOrder(e, orderItem)}><MdLibraryAddCheck fontSize={'1.2rem'}/> Accept</div>
          : orderItem.status === 'in progress' ? 
            <div className="dropdown-item" onClick={(e)=>processOrder(e, orderItem)}><BsFillCheckSquareFill fontSize={'1.1rem'} /> Ready</div>
          : orderItem.status === 'ready' ? 
            <div className="dropdown-item" onClick={(e)=>processOrder(e, orderItem)}><AiOutlineFileDone fontSize={'1.2rem'} /> Fullfilled</div> 
          : null
        }
        {orderItem.status !== 'pending' &&  
        <div className="dropdown-item" onClick={(e)=>handleRevertOrder(e, orderItem)} >
          <GrRevert fontSize={'1.2rem'}/>  Revert
        </div>}
        <div className="dropdown-item" onClick={(e)=>handleDeleteOrder(e)} >
          <AiFillDelete fontSize={'1.3rem'}/> Delete
        </div>
      </motion.div>
    </div>
  )
}


export default DropdownMenu;