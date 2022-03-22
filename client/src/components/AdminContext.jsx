import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useGetOrdersQuery, useGetTimeSlotsQuery, useUpdateTimeSlotMutation } from '../features/api'

export const OrdersContext = React.createContext()
export const TimeSlotsContext = React.createContext()

export const useOrders = () => {
  return useContext(OrdersContext)
}

export const useTimeSlots = () => {
  return useContext(TimeSlotsContext)
}


const AdminContext = ({children}) => {
  const ordersQuery = useGetOrdersQuery()
  const timeSlotsQuery = useGetTimeSlotsQuery()
  const [ updateTimeSlot, results ] = useUpdateTimeSlotMutation()

  useEffect(()=>{
    // refetches orders every minute
    setInterval(ordersQuery.refetch, 60000)
  },[])

  useEffect(()=>{
    if(ordersQuery.isSuccess){
      toast.success('Orders successfully fetched', {autoclose: 1500, hideProgressBar: true})
    }
    if(ordersQuery.isError){
      toast.error('Orders were not fetched', {autoclose: 1500, hideProgressBar: true})
    }
  },[ordersQuery])

  // on ordersquery refetches, calculate the current available time slots
  useEffect(()=> {
    if(timeSlotsQuery.data && ordersQuery.data){
      const time = new Date()
      time.setMinutes(time.getMinutes() + 30)
      const timeString = time.toLocaleTimeString('en-US', {hour12: false})
      const formatTime = timeString.slice(0,2).concat(timeString.slice(3, 5))
      timeSlotsQuery.data
        .filter(timeslot => (timeslot.active === true))
        .map(activeTimeslot => {
          const updatedTimeslot = {
            ...activeTimeslot,
            currentQuantity: activeTimeslot.startingQuantity
          }
          if(updatedTimeslot.time <= formatTime){
            updatedTimeslot.active = false
          }
          ordersQuery.data.map(order => {
            if(order.pickUpTime === updatedTimeslot.time){
              updatedTimeslot.currentQuantity -= 1
              if(updatedTimeslot.currentQuantity === 0){
                updatedTimeslot.active = false
              }
            }
          })
          updateTimeSlot(updatedTimeslot)
        })
    }
  },[ordersQuery])

  return (
    <OrdersContext.Provider value={ordersQuery}>
      <TimeSlotsContext.Provider value={timeSlotsQuery}>
        {children}
      </TimeSlotsContext.Provider>
    </OrdersContext.Provider>
  )
}

export default AdminContext