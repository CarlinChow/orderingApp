import Sidebar from './Sidebar'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AdminContext from './AdminContext'
import { Outlet } from 'react-router-dom'

const AdminContainer = () => {
  // authentication
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if(!user){
      navigate('login')
    }
  },[user, navigate])

  return (
    <AdminContext>
      <div className='page'>
        <Sidebar />
        <Outlet />
      </div>
    </AdminContext>
  )
}

export default AdminContainer