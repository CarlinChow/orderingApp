import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import Button from './Button'
import { toast } from 'react-toastify'


const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    toast.info('You have logged out.')
    navigate('/login')
  }

  const handleRegisterUser = (event) => {
    event.preventDefault()
    navigate('/admin/register')
  }

  return (

    <div className='sidebar'>
      <div className='sidebar-header'> 
        <h3>Welcome, {user ? user.name : null}</h3>
      </div>
      <div className='sidebar-content'> 
        <Link className='sidebar-link' to="/admin/orders">Orders</Link>
        <Link className='sidebar-link' to="/admin/foods">Foods</Link>
        <Link className='sidebar-link' to="/admin/pickuptimes">Pickup Times</Link>
      </div>
      <div className='sidebar-footer'> 
        <Button text="Register a User" color='grey' onClick={(e)=>handleRegisterUser(e)}/>
        <Button text='Logout' color='grey' onClick={(e)=>handleLogout(e)}/>
      </div>
    </div>
  )
}

export default Sidebar