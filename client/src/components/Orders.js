import OrdersCard from './OrdersCard'
import { useState } from 'react'
import { useOrders } from './AdminContext'


const Orders = () => {
  const { data, error, isLoading, isSuccess, isError } = useOrders()
  const [ dropdownObjId, setDropdownObjId ] = useState(null)

  if(isError){
    return <div className='orders'>{error.message}</div>
  }
  return (
    <div className='orders'>
      <OrdersCard
        status={'Pending'} 
        isLoading={isLoading} 
        dropdownObjId={dropdownObjId}
        setDropdownObjId={setDropdownObjId}
        orderArr={!isSuccess ? null : data.filter(orderItem => 
          orderItem.status === 'pending')}
      />
      <OrdersCard
        status={'In Progress'} 
        isLoading={isLoading}
        dropdownObjId={dropdownObjId}
        setDropdownObjId={setDropdownObjId} 
        orderArr={!isSuccess ? null : data.filter(orderItem => 
          orderItem.status === 'in progress')}
      />
      <OrdersCard
        status={'Ready'} 
        isLoading={isLoading}
        dropdownObjId={dropdownObjId}
        setDropdownObjId={setDropdownObjId} 
        orderArr={!isSuccess ? null : data.filter(orderItem => 
          orderItem.status === 'ready')}
      />
      <OrdersCard
        status={'Fullfilled'} 
        isLoading={isLoading} 
        dropdownObjId={dropdownObjId}
        setDropdownObjId={setDropdownObjId}
        orderArr={!isSuccess ? null : data.filter(orderItem => 
          orderItem.status === 'fullfilled')}
      />
    </div>
  )
}

export default Orders