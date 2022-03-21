import Order from './Order'
import LoadingSpinner from './LoadingSpinner'
import { AnimatePresence } from 'framer-motion'

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
          ? <AnimatePresence>
              {orderArr.map((orderItem) => (
                <Order 
                  orderItem={orderItem} 
                  key={orderItem._id} 
                  dropdownObjId={dropdownObjId} 
                  setDropdownObjId={setDropdownObjId}
                />
              ))} 
            </AnimatePresence>
          : <p className='empty-order'>Nothing to show here...</p>)}
      </div>
    </div>
  )
}

export default OrdersCard