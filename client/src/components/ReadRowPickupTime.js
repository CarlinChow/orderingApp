import Button from './Button'

const ReadRowPickupTime = ({timeSlot, index, setEditRowObjectId}) => {
  const editHandler = (event) => {
    event.preventDefault()
    setEditRowObjectId(timeSlot._id)
  }
  const formattedTime = (timeSlot.time.slice(0, 2) % 12).toString().concat(":", timeSlot.time.slice(2, 4), timeSlot.time.slice(0,2) > 12 ? "PM" : "AM")

  return (
    <tr 
      className={`${timeSlot.active ? 'timeslot-active' : 'timeslot-inactive'}`}
      key={index}
    >
      <td>{formattedTime}</td>
      <td>{timeSlot.startingQuantity}</td>
      <td>{timeSlot.currentQuantity}</td>
      <td>{timeSlot.active.toString()}</td>
      <td><Button text='edit' color='grey' onClick={(e)=>editHandler(e)}/></td>
    </tr>
  )
}

export default ReadRowPickupTime