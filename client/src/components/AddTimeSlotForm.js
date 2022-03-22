import { usePostTimeSlotMutation } from "../features/api"
import { useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import Button from './Button'
import { toast } from 'react-toastify'

const AddTimeSlotForm = () => {
  const initialTimeSlotState = {
    time: '0000',
    startingQuantity: '',
    active: false,
  }

  const [ postTimeSlot, results ] = usePostTimeSlotMutation()
  const [ newTimeSlot, setNewTimeSlot ] = useState(initialTimeSlotState)
  const formattedTime = newTimeSlot.time.slice(0, 2).concat(":", newTimeSlot.time.slice(2, 4))

  useEffect(()=>{
    if(results.isSuccess){
      toast.success('TimeSlot has been added successfully!')
      results.reset()
    }
    if(results.isError){
      toast.error(`An Error occured: ${results.error.message}`)
      results.reset()
    }
  },[results])

  const handleTimeChange = (event) => {
    event.preventDefault()
    const updatedTime = event.target.value.slice(0, 2).concat(event.target.value.slice(3, 5))
    setNewTimeSlot(prev => {
      return{
        ...prev,
        time: updatedTime
      }
    })
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setNewTimeSlot(prev => {
      return{
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!newTimeSlot.time ||  !newTimeSlot.startingQuantity){
      toast.warn('please fill in all fields before submitting')
      return
    }
    await postTimeSlot({
      ...newTimeSlot,
      currentQuantity: newTimeSlot.startingQuantity
    })
    setNewTimeSlot(initialTimeSlotState)
  }

  return (
    <div className='add-form'>
      <h1> 
        Add a Time Slot
      </h1>
      <form>
        <input type='time' value={formattedTime} name='time' onChange={e=>handleTimeChange(e)}/>
        <input type='number' name='startingQuantity' value={newTimeSlot.startingQuantity} placeholder='Enter Starting Quantity' onChange={e=>handleInputChange(e)}/>
        <label>
          <Toggle name='active' checked={newTimeSlot.active} onChange={e=>handleInputChange(e)}/>
          Active
        </label>
        <Button onClick={e=>handleSubmit(e)} text='Add' color='grey'/>
      </form>
    </div>
  )
}

export default AddTimeSlotForm