import { useState, useEffect } from 'react'
import { useRegisterUserMutation } from '../features/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import image from '../img/authBackground.jpg'
import { IoCreateOutline } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import LoadingSpinner from '../components/LoadingSpinner'

const RegisterUserPage = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  // authenticate user
  useEffect(() => {
    if(!user){
      navigate('login')
    }
  },[user, navigate])

  const initalFormState = {
    username: '',
    password: '',
    password2: '',
  }
  const [ registerUser, result ] = useRegisterUserMutation() 
  const [ form, setForm ] = useState(initalFormState)

  useEffect(()=> {
    if(result.isSuccess){
      toast.success('User has been registered successfully')
      setForm(initalFormState)
      navigate('/admin/orders')
    }
    if(result.isError){
      toast.error('An error has occured, user has not been registered')
    }
  },[result])


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

  const handlePress = (event) => {
    if(event.key === 'Enter'){
      handleRegisterUser(event)
    }
  }

  if(result.isLoading){
    return (
      <div 
      className='login-page'
      style={{backgroundImage: `url(${image})`, opacity: 0.5 }}
      >
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div 
      className="login-page"
      style={{backgroundImage: `url(${image})`, opacity: 0.5 }}
      onKeyPress={handlePress}
    >
      <div className='login-card'>
        <div className='register-card-header'>
          <IoIosArrowBack 
            className='icon'
            fontSize='2rem'
            onClick={()=>navigate('/admin/orders')}
          />
          <div className='register-title'>
            <IoCreateOutline />
            <div>Register</div>
          </div>
        </div>
        <label>
          Username: 
          <input 
            type='text' 
            placeholder='enter a username...'
            autoComplete='off'
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
            autoComplete='off'
            name='password'
            onChange={e=>handleInputChange(e)}
            value={form.password}
          />
        </label>
        <label>
          Confirm Password: 
          <input 
            type='password' 
            placeholder='enter the password again...'
            autoComplete='off'
            name='password2'
            onChange={e=>handleInputChange(e)}
            value={form.password2}
          />
        </label>
        <button onClick={handleRegisterUser}>Register</button>
      </div>
    </div>
  )
}

export default RegisterUserPage