import { useState, Fragment } from 'react'
import { useTimeSlots } from './AdminContext'
import LoadingSpinner from './LoadingSpinner'
import ReadRowPickupTime from './ReadRowPickupTime'
import EditRowPickupTime from './EditRowPickupTime'
import { useUpdateTimeSlotMutation } from '../features/api'

const TimeSlotsTable = ({timeSlots}) => {
  const [ updateTimeSlot, results ] = useUpdateTimeSlotMutation()
  const [ editRowObjectId, setEditRowObjectId ] = useState(null)
  const { data, isLoading, isError, error } = timeSlots

  // const handleReset = (event) => {
  //   event.preventDefault()
  //   data.map(timeslot => {
  //     const updatedTimeSlot = {...timeslot}
  //     updatedTimeSlot.currentQuantity = updatedTimeSlot.startingQuantity
  //     updateTimeSlot(updatedTimeSlot)
  //     return timeslot
  //   })
  // }

  // const handleToggleActive = (event) => {
  //   event.preventDefault()
  //   data.map(timeslot => {
  //     const updatedTimeSlot = {...timeslot}
  //     updatedTimeSlot.active = true
  //     updateTimeSlot(updatedTimeSlot)
  //     return timeslot
  //   })
  // }

  // const handleToggleInactive = (event) => {
  //   event.preventDefault()
  //   data.map(timeslot => {
  //     const updatedTimeSlot = {...timeslot}
  //     updatedTimeSlot.active = false
  //     updateTimeSlot(updatedTimeSlot)
  //     return timeslot
  //   })
  // }
  
  if(isError){
    alert(`An error occured ${error.message}`)
    return
  }

  if(isLoading){
    return <LoadingSpinner />
  }

  return (
    <div className='foods-table'>
      {/* <div className='table-btns'> 
        <Button text='Reset' color='#34568b' onClick={handleReset}/>
        <Button text='Toggle All Active' color='#34568b' onClick={handleToggleActive}/>
        <Button text='Toggle All Inactive' color='#34568b' onClick={handleToggleInactive}/>
      </div> */}
        <table>
          <thead> 
            <tr> 
              <th>Time</th>
              <th>Starting Quantity</th>
              <th>Current</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((timeSlot, index) => (
              <Fragment key={index}>
                {
                  timeSlot._id === editRowObjectId ?
                  <EditRowPickupTime timeSlot={timeSlot} index={index} setEditRowObjectId={setEditRowObjectId}/>
                  : <ReadRowPickupTime timeSlot={timeSlot} index={index} setEditRowObjectId={setEditRowObjectId}/>  
                }
              </Fragment>
            ))} 
          </tbody>
        </table>
      </div>
  )
}

export default TimeSlotsTable