import { useState, useEffect } from 'react'
import { useLoginUserMutation } from '../features/api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import { BiLogIn } from 'react-icons/bi'
import { toast } from 'react-toastify'
import image from '../img/authBackground.jpg'
import { motion } from 'framer-motion'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [ loginUser, result ] = useLoginUserMutation()
  const [ form, setForm ] = useState({
    name: '',
    password: '',
  })

  useEffect(()=>{
    if(user){
      navigate('/admin/orders')
    }
  },[user, navigate])


  useEffect(() => {
    if(result.data && result.data.token){
      toast.success("You have successfully logged in!")
      dispatch(login(result.data))
      setForm({
        name: '',
        password: '',
      })
      navigate('/admin/orders')
    }
    if(result.isError) {
      toast.error('invalid credentials')
    }
  }, [result.data, result.isError, dispatch, navigate])


  const onChangeForm = (event) => {
    event.preventDefault()
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleLoginUser = async(event) => {
    event.preventDefault()
    if(!form.name || !form.password){
      toast.warn('Please enter all fields!')
      return
    }
    await loginUser({
      name: form.name,
      password: form.password
    })
  }

  const handlePress = (event) => {
    if(event.key === 'Enter'){
      handleLoginUser(event)
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
      className='login-page'
      style={{backgroundImage: `url(${image})`, opacity: 0.5 }}
      onKeyPress={handlePress}
    >
      <div className='login-card'>
        <div className='login-card-header'>
          <BiLogIn /> 
          <div>Login</div>
        </div>
        <label>
          Username:
          <input 
            type='text'
            name='name' 
            value={form.name} 
            placeholder='Enter your username'
            onChange={e=>onChangeForm(e)}
            autoComplete='off'
          />
        </label>
        <label>
          Password:
          <input 
            type='password' 
            name='password'
            value={form.password} 
            placeholder='Enter your password'
            onChange={e=>onChangeForm(e)}
            autoComplete='off'
          />
        </label>
        <motion.button 
          onClick={e=>handleLoginUser(e)}
          whileTap={{scale: 0.9}}
        >
          Login
        </motion.button>
      </div>
    </div>
  )
}

export default LoginPage