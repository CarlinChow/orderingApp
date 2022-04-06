import TimeSlotsTable from '../components/TimeSlotsTable'
import AddTimeSlotForm from '../components/AddTimeSlotForm'
import { MdExpandMore } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTimeSlots } from '../components/AdminContext'
import { useUpdateTimeSlotMutation } from '../features/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { toast } from 'react-toastify'
import { GrPowerReset, GrAdd  } from 'react-icons/gr'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

const PickupTimesPage = () => {
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false)
  const [ updateTimeSlot, results ] = useUpdateTimeSlotMutation()
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const timeSlots = useTimeSlots()

  useEffect(()=>{
    if(results.isSuccess){
      toast.success('Updated Successfully')
      results.reset()
    }
    if(results.isError){
      toast.error(`An error occcured while updating: ${results.error.status}`)
      results.reset()
    }
  },[results])

  const handleReset = (event) => {
    event.preventDefault()
    timeSlots.data.map(timeslot => {
      const updatedTimeSlot = {...timeslot}
      updatedTimeSlot.currentQuantity = updatedTimeSlot.startingQuantity
      updateTimeSlot(updatedTimeSlot)
      return timeslot
    })
    setIsDropdownOpen(false)
  }

  const handleToggleActive = (event) => {
    event.preventDefault()
    timeSlots.data.map(timeslot => {
      const updatedTimeSlot = {...timeslot}
      updatedTimeSlot.active = true
      updateTimeSlot(updatedTimeSlot)
      return timeslot
    })
    setIsDropdownOpen(false)
  }

  const handleToggleInactive = (event) => {
    event.preventDefault()
    timeSlots.data.map(timeslot => {
      const updatedTimeSlot = {...timeslot}
      updatedTimeSlot.active = false
      updateTimeSlot(updatedTimeSlot)
      return timeslot
    })
    setIsDropdownOpen(false)
  }

  return (
      <div className="content">
        <div className='page-header'>
          <div>Pickup Times</div>
          <MdExpandMore 
            className='icon' 
            onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
          />
          {results.isLoading && <LoadingSpinner />}
        </div>
        <div className='foods-dropdown-menu-container'>
          <AnimatePresence>
            {isDropdownOpen && 
              <motion.div 
                className='pickuptimes-dropdown-menu'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
              >
                <div 
                  className='foods-dropdown-item'
                  onClick={handleReset}
                >
                  <GrPowerReset />
                  <div>Reset</div>
                </div>
                <div 
                  className='foods-dropdown-item'
                  onClick={handleToggleActive}
                >
                  <AiOutlineCheckCircle />
                  <div>Toggle Active</div>
                </div>
                <div 
                  className='foods-dropdown-item'
                  onClick={handleToggleInactive}
                >
                  <AiOutlineCloseCircle />
                  <div>Toggle Inactive</div>
                </div>
                <div 
                  className='foods-dropdown-item'
                  onClick={()=>setIsModalOpen(true)}
                >
                  <GrAdd />
                  <div>Add Item</div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
        <TimeSlotsTable timeSlots={timeSlots}/>
        <AnimatePresence> 
          {isModalOpen && <AddTimeSlotForm closeModal={()=>setIsModalOpen(false)}/>}
        </AnimatePresence>
      </div>
  )
}

export default PickupTimesPage