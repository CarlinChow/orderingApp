import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useGetOrdersQuery, useGetTimeSlotsQuery } from '../features/api'

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
  
  useEffect(()=>{
    // refetches orders every minute
    setInterval(()=>{ 
      ordersQuery.refetch()
      timeSlotsQuery.refetch()
    }, 60000)
  },[])

  useEffect(() => {
    if(!ordersQuery.isFetching){
      if(ordersQuery.isSuccess){
        toast.success('Orders successfully fetched', {autoclose: 1500, hideProgressBar: true})
      }
      if(ordersQuery.isError){
        toast.error('Orders were not fetched', {autoclose: 1500, hideProgressBar: true})
      }
    }
  }, [ordersQuery.isFetching, ordersQuery.isSuccess, ordersQuery.isError])

  useEffect(()=>{
    if(!timeSlotsQuery.isFetching){
      if(timeSlotsQuery.isSuccess){
        toast.success('Pick up times successfully fetched', {autoclose: 1500, hideProgressBar: true})
      }
      if(timeSlotsQuery.isError){
        toast.error('Pick up times were not fetched', {autoclose: 1500, hideProgressBar: true})
      }
    }
  },[timeSlotsQuery.isFetching, timeSlotsQuery.isSuccess, timeSlotsQuery.isError])

  return (
    <OrdersContext.Provider value={ordersQuery}>
      <TimeSlotsContext.Provider value={timeSlotsQuery}>
        {children}
      </TimeSlotsContext.Provider>
    </OrdersContext.Provider>
  )
}

export default AdminContext