import Orders from '../components/Orders'
import Clock from '../components/Clock'
import AdminContainer from '../components/AdminContainer'


const OrdersPage = () => {
  return (
      <div className="content">
        <div className='page-header'>
          <h1>Orders</h1>
          {/* <Clock type='time'/> */}
        </div>
        <Orders />
      </div>
  )
}

export default OrdersPage