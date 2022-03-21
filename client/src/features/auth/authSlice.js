import { createSlice } from '@reduxjs/toolkit'

// Get user from localStorage 
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      state.user = null
    },
    login: (state, {payload}) => {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    }
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer