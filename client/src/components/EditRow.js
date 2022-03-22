import Toggle from 'react-toggle'
import Button from './Button'
import { useState, useEffect } from 'react'
import { useUpdateFoodMutation, useDeleteFoodMutation } from '../features/api'
import { toast } from 'react-toastify'

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

  const [ updateFood, updateResults ] = useUpdateFoodMutation()
  const [ deleteFood, deleteResults ] = useDeleteFoodMutation()
  const [ editedFoodItem, setEditedFoodItem ] = useState({...foodItem})

  useEffect(()=> {
    if(updateResults.isSuccess){
      console.log('hello im here')
      toast.success('Item has been updated!')
      updateResults.reset()
    }
    if(updateResults.isError){
      toast.error(`An error has occured: ${updateResults.error.message}`)
      updateResults.reset()
    }
    if(deleteResults.isSuccess){
      toast.success('Item has been deleted!')
      deleteResults.reset()
    }
    if(deleteResults.isError){
      toast.error(`An error has occured: ${updateResults.error.message}`)
      deleteResults.reset()
    }
  },[updateResults, deleteResults])

  const saveHandler = async (event) => {
    event.preventDefault()
    await updateFood(editedFoodItem)
    setEditedFoodItem(initialFoodItem)
    setEditRowObjectID(null)
  }

  const deleteHandler = async (event) => {
    event.preventDefault()
    await deleteFood(foodItem._id)
    setEditRowObjectID(null)
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