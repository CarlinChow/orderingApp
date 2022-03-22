import Button from './Button'
import Toggle from 'react-toggle'
import { useState, useEffect } from 'react'
import { usePostFoodMutation } from '../features/api'
import { toast } from 'react-toastify'
import { GiTargetPoster } from 'react-icons/gi'

const AddFoodForm = () => {
  const initialFoodItemState ={
    name: "",
    price_md: "",
    price_lg: "",
    price_sm: "",
    desc: "",
    category: "",
    availability: false,
  }

  const [ postFood, results ] = usePostFoodMutation()
  const [ newFoodItem, setNewFoodItem ] = useState(initialFoodItemState)

  useEffect(()=>{
    if(results.isSuccess){
      toast.success('Food Item has been added successfully!')
      results.reset()
    }
    if(results.isError){
      toast.error(`An Error occured: ${results.error.message}`)
      results.reset()
    }
  },[results])

  const onChangeForm = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setNewFoodItem({
      ...newFoodItem,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!newFoodItem.name || !newFoodItem.price_md){
      toast.warn('Please fill in all fields')
      return
    }
    postFood(newFoodItem)
    setNewFoodItem(initialFoodItemState)
  }
  
  return (
    <div className='add-form'>
      <h1>
        Add a Food item
      </h1>
      <form>
        <input type='text' value={newFoodItem.name} name='name' required='required' placeholder='Enter a name' onChange={(e)=>onChangeForm(e)} autoComplete='off'/>
        <input type='number' value={newFoodItem.price_md} name='price_md' required='required' placeholder='Enter price for medium' onChange={(e)=>onChangeForm(e)}/>
        <input type='number' value={newFoodItem.price_lg} name='price_lg' placeholder='Enter price for large (optional)' onChange={(e)=>onChangeForm(e)}/>
        <input type='string' value={newFoodItem.desc} name='desc' placeholder='Enter a description' onChange={(e)=>onChangeForm(e)}/>
        <input type='text' value={newFoodItem.category} name='category'placeholder='Enter a category(optional)' onChange={(e)=>onChangeForm(e)} autoComplete='off'/>
        <label>
          <Toggle name='availability' checked={newFoodItem.availability} onChange={(e)=>onChangeForm(e)}/>
          Availability 
        </label>
        <Button onClick={e=>handleSubmit(e)} text='Add' color='grey'/>
      </form>
    </div>
  )
}

export default AddFoodForm