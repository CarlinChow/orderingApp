import { Link, useNavigate, useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { BiTimeFive, BiNotepad, BiLogOut } from 'react-icons/bi'
import { GiHotMeal } from 'react-icons/gi'
import { AiOutlineUserAdd } from 'react-icons/ai' 


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

  return (
    <div className='sidebar'>
      <div className='sidebar-header'> 
        <h3>Welcome, {user ? user.name : null}</h3>
      </div>
      <div className='sidebar-content'> 
        <Link 
          className={`sidebar-link ${useMatch('/admin/orders') !== null ? 'selected' : ''}`} 
          to="/admin/orders"
        >
          <BiNotepad fontSize='1.4rem'/>
          <span>Orders</span>
        </Link>
        <Link 
          className={`sidebar-link ${useMatch('/admin/foods') !== null ? 'selected' : ''}`}
          to="/admin/foods"
        >
          <GiHotMeal fontSize='1.4rem'/>
          <span>Foods</span>
        </Link>
        <Link 
          className={`sidebar-link ${useMatch('/admin/pickuptimes') !== null ? 'selected' : ''}`}
          to="/admin/pickuptimes"
        >
          <BiTimeFive fontSize='1.4rem'/>
          <span>Pickup Times</span>
        </Link>
      </div>
      <div className='sidebar-footer'> 
        <div onClick={()=>navigate('/register')}>
          <AiOutlineUserAdd />
          Register User
        </div>
        <div onClick={(e)=>handleLogout(e)}>
          <BiLogOut />
          Log out
        </div>
      </div>
    </div>
  )
}

export default Sidebar