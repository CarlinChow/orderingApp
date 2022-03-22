import { useState, useEffect } from 'react'
import Button from '../components/Button'
import { useRegisterUserMutation, useLoginUserMutation } from '../features/api'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login, logout } from '../features/auth/authSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import { BiLogIn } from 'react-icons/bi'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const [ registerUser, registerResult] = useRegisterUserMutation()
  const [ loginUser, loginResult ] = useLoginUserMutation()
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
    if(registerResult.data && registerResult.data.token){
      toast.success('User Created, logging in...')
      dispatch(login(registerResult.data))
      setForm({
        name: '',
        password: '',
      })
      navigate('/admin/orders')
    }
    if(registerResult.isError) {
      toast.error('An error occured while registering')
    }
  }, [registerResult.data, registerResult.isError, dispatch, navigate])

  useEffect(() => {
    if(loginResult.data && loginResult.data.token){
      toast.success("You have successfully logged in!")
      dispatch(login(loginResult.data))
      setForm({
        name: '',
        password: '',
      })
      navigate('/admin/orders')
    }
    if(loginResult.isError) {
      toast.error('invalid credentials')
    }
  }, [loginResult.data, loginResult.isError, dispatch, navigate])


  const onChangeForm = (event) => {
    event.preventDefault()
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleRegisterUser = async(event) => {
    event.preventDefault()
    if(!form.name || !form.password){
      toast.warn('Please enter all fields!')
      return
    }
    await registerUser({
      name: form.name,
      password: form.password
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

  if(registerResult.isLoading || loginResult.isLoading){
    return <LoadingSpinner />
  }
  return (
    <div className='login-page'>
      <h1><BiLogIn />Login</h1>
      <input type='text'name='name' value={form.name} placeholder='Enter your username' onChange={e=>onChangeForm(e)}/>
      <input type='password' name='password'value={form.password} placeholder='Enter your password' onChange={e=>onChangeForm(e)}/>
      {loginResult.isError && <p>Incorrect Credentials!</p>}
      <Button text='Login' color='grey' onClick={e=>handleLoginUser(e)}/>
    </div>
  )
}

export default LoginPage