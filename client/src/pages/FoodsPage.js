import FoodsTable from '../components/FoodsTable'
import AddFoodForm from '../components/AddFoodForm'

const FoodsPage = () => {

  return (
    <div className="content">
      <div className='page-header'>
        <h1>Foods</h1>
      </div>
      <FoodsTable />
      <AddFoodForm />
    </div>
  )
}

export default FoodsPage