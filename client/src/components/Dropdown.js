import { useState, useEffect } from 'react' 
import DropdownMenu from './DropdownMenu'
import { GoKebabVertical } from 'react-icons/go'
import DeleteOrderDropdown from './DeleteOrderDropdown'
import { AnimatePresence } from 'framer-motion'

const Dropdown = ({orderItem, setModalViewOrder, dropdownObjId, setDropdownObjId}) => {
  useEffect(() => {
    if(dropdownObjId !== null){
      setIsOpen(false)
    }
  },[dropdownObjId])

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event) => {
    event.stopPropagation();
    setDropdownObjId(orderItem._id === dropdownObjId ? null : orderItem._id)
    setIsOpen(false)
  }

  return (
    <div>
      <GoKebabVertical className='react-icon' fontSize={'1.3rem'} onClick={(e)=>handleClick(e)}/>
      <AnimatePresence>
        {(isOpen && dropdownObjId === null) && 
          <DeleteOrderDropdown
            closeDropdown={()=>setIsOpen(false)}
            orderItem={orderItem} 
          /> 
        }
        {orderItem._id === dropdownObjId && 
          <DropdownMenu 
            setIsOpen={setIsOpen} 
            orderItem={orderItem} 
            closeDropdown={()=>setDropdownObjId(null)} 
            setModalViewOrder={setModalViewOrder}
          />
        }
      </AnimatePresence>
    </div>
  )
}

export default Dropdown