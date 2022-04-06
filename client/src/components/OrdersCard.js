import Order from './Order'
import LoadingSpinner from './LoadingSpinner'

const OrdersCard = ({status, orderArr, isLoading, dropdownObjId, setDropdownObjId}) => {
  return (
    <div className='orders-card'>
      <div className="status">
        <h2>{status}</h2>
      </div>
      <div className='orders-list'>
      {isLoading 
        ? <LoadingSpinner /> 
        : (orderArr.length > 0 
          ? <>
              {orderArr.map((orderItem) => (
                <Order 
                  orderItem={orderItem} 
                  key={orderItem._id} 
                  dropdownObjId={dropdownObjId} 
                  setDropdownObjId={setDropdownObjId}
                />
              ))} 
            </>
          : <div className='empty-order'>Nothing to show here...</div>)}
      </div>
    </div>
  )
}

export default OrdersCard