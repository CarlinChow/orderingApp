
const QuickViewOrder = ({orderItem}) => {
  const orderArr = orderItem.foodOrderArr

  // compute size integer value to a string (S, L)
  const computeSizeToString = (size) => {
    if(size === 2){
      return '(L)'
    } else if(size === 1){
      return '(S)'
    }
  }

  return (
    <div className='quick-view-order'>
      {orderArr.map((foodItem, index) => (
        <div className='food-item' key={index}>
          <h3>{foodItem.quantity} x {foodItem.food.name} {foodItem.food.hasOwnProperty('price_lg') && computeSizeToString(foodItem.size)}</h3>
          {foodItem.note && <p>    {foodItem.note}</p>}
        </div>
      ))}
    </div>
  )
}

export default QuickViewOrder