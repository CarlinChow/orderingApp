import Toggle from 'react-toggle'
import Button from './Button'
import { useState } from 'react'
import { useUpdateFoodMutation, useDeleteFoodMutation } from '../features/api'

const EditRow = ({foodItem, index, setEditRowObjectID}) => {
  const initialFoodItem = {
    _id: foodItem._id,
    name: foodItem.name,
    price_md: foodItem.price_md,
    price_lg: foodItem.price_lg,
    desc: foodItem.desc,
    category: foodItem.category,
    availability: foodItem.availability,
  }

  const [ updateFood ] = useUpdateFoodMutation()
  const [ deleteFood ] = useDeleteFoodMutation()
  const [ editedFoodItem, setEditedFoodItem ] = useState({...foodItem})

  const saveHandler = (event) => {
    event.preventDefault()
    updateFood(editedFoodItem)
    setEditedFoodItem(initialFoodItem)
    setEditRowObjectID('')
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    deleteFood(foodItem._id)
  }

  const onChangeFoodItem = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setEditedFoodItem({
      ...editedFoodItem,
      [name]: value
    })
  }

  return (
    <tr key={index}>
      <td>
        <input type='text' name='name' value={editedFoodItem.name} onChange={e=>onChangeFoodItem(e)}/>
      </td>
      <td>
        <input type='number' name='price_md' value={editedFoodItem.price_md} onChange={e=>onChangeFoodItem(e)}/>
      </td>
      <td>
        <input type='number' name='price_lg' value={editedFoodItem.price_lg} onChange={e=>onChangeFoodItem(e)}/>
      </td>
      <td>
        <input type='string' name='desc' value={editedFoodItem.desc} onChange={e=>onChangeFoodItem(e)}/>
      </td>
      <td>
        <input type='string' name='category' value={editedFoodItem.category} onChange={e=>onChangeFoodItem(e)}/>
      </td>
      <td>
        <Toggle name='availability' checked={editedFoodItem.availability} onChange={e=>onChangeFoodItem(e)}/>
      </td>
      <td>
        <Button text='save' color='grey' onClick={(e)=>saveHandler(e)}/>
        <Button text='delete' color='crimson' onClick={(e)=>deleteHandler(e)}/>
      </td>
    </tr>
  )
}

export default EditRow