import { useState, useEffect } from 'react'
import { useRegisterUserMutation } from '../features/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const RegisterUserPage = () => {
  const initalFormState = {
    username: '',
    password: '',
    password2: '',
  }
  const navigate = useNavigate()
  const [ registerUser, results ] =useRegisterUserMutation() 
  const [ form, setForm ] = useState(initalFormState)

  useEffect(()=> {
    if(results.isSuccess){
      toast.success('User has been registered successfully')
      setForm(initalFormState)
      navigate('/admin/orders')
    }
    if(results.isError){
      toast.error('An error has occured, user has not been registered')
    }
  },[results])


  const handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setForm(prev => {
      return{
        ...prev,
        [name]: value,
      }
    })
  }

  const handleRegisterUser = (event) => {
    event.preventDefault()
    if(form.password !== form.password2){
      toast.warn('Your password does not match, please try again!')
      return
    }
    registerUser({
      name: form.username,
      password: form.password
    })
  }

  return (
    <div className="content">
      <div className='page-header'>
        Register A User
      </div>
      <label>
        Username: 
        <input 
          type='text' 
          placeholder='enter a username...'
          autoComplete={false}
          name='username'
          onChange={e=>handleInputChange(e)}
          value={form.username}
        />
      </label>
      <label>
        Password: 
        <input 
          type='password' 
          placeholder='enter a password...'
          autoComplete={false}
          name='password'
          onChange={e=>handleInputChange(e)}
          value={form.password}
        />
      </label>
      <label>
        Confirm Password: 
        <input 
          type='password' 
          placeholder='enter the same password...'
          autoComplete={false}
          name='password2'
          onChange={e=>handleInputChange(e)}
          value={form.password2}
        />
      </label>
      <button onClick={handleRegisterUser}>Register User</button>
    </div>
  )
}

export default RegisterUserPage