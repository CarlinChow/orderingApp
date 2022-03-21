import TimeSlotsTable from '../components/TimeSlotsTable'
import AddTimeSlotForm from '../components/AddTimeSlotForm'

const PickupTimesPage = () => {

  return (
      <div className="content">
        <div className='page-header'>
          <h1>Pickup Times</h1>
        </div>
        <TimeSlotsTable />
        <AddTimeSlotForm />
      </div>
  )
}

export default PickupTimesPage