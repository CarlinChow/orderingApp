import Button from './Button'

const ReadOnlyRow = ({foodItem, index, setEditRowObjectID}) => {
  const editHandler = (event) => {
    event.preventDefault()
    setEditRowObjectID(foodItem._id)
  }
  
  return (
    <tr className='foods-row' key={index}>
      <td>{foodItem.name}</td>
      <td>{foodItem.price_md}</td>
      <td>{foodItem.price_lg}</td>
      <td>{foodItem.desc}</td>
      <td>{foodItem.category}</td>
      <td>{foodItem.availability ? 'In Stock' : 'Out of Stock'}</td>
      <td><Button text='edit' color='grey' onClick={(e)=>editHandler(e)}/></td>
  </tr>
  )
}

export default ReadOnlyRow