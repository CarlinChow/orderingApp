import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const order = JSON.parse(sessionStorage.getItem('order'))

const emptyOrder = {
  name: '',
  telephoneNum: '',
  foodOrderArr: [],
  numOfItems: 0,
  orderSubTotal: 0,
  pickUpTime: '',
  specialInstructions: '',
  utensils: 0,
}

const initialState = order ? order : emptyOrder

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    // pass food order to payload and add to order state
    addToOrder: (state, {payload}) => {
      state.foodOrderArr.push(payload)
      state.orderSubTotal = 0
      state.numOfItems = 0
      state.foodOrderArr.map(foodOrder => {
        state.orderSubTotal += foodOrder.foodTotal
        state.numOfItems += foodOrder.quantity
      })
      sessionStorage.setItem('order', JSON.stringify(state))
    },

    deleteFoodItemByIndex: (state, {payload}) => {
      state.foodOrderArr = state.foodOrderArr.filter((foodOrder, index) => index !== payload)
      state.orderSubTotal = 0
      state.numOfItems = 0
      state.foodOrderArr.map(foodOrder => {
        state.orderSubTotal += foodOrder.foodTotal
        state.numOfItems += foodOrder.quantity
      })
      sessionStorage.setItem('order', JSON.stringify(state))
    },

    // 
    deleteFromOrder: (state, {payload}) => {
      state.foodOrderArr = state.foodOrderArr.filter(foodOrder => foodOrder.food._id !== payload.food._id)
      state.orderSubTotal = 0
      state.numOfItems = 0
      state.foodOrderArr.map(foodOrder => {
        state.orderSubTotal += foodOrder.foodTotal
        state.numOfItems += foodOrder.quantity
      })
      sessionStorage.setItem('order', JSON.stringify(state))
    },

    updateOrderInfo: (state, {payload}) => {
      sessionStorage.setItem('order', JSON.stringify({...state, ...payload}))
      return {
        ...state, 
        ...payload
      }
    },

    updateFoodOrder: (state, {payload}) => {
      state.foodOrderArr = state.foodOrderArr.map((foodOrder) => {
        if(payload.food._id !== foodOrder.food._id){
          return foodOrder
        }
        return payload
      })
      state.orderSubTotal = 0
      state.numOfItems = 0
      state.foodOrderArr.map(foodOrder => {
        foodOrder.foodTotal = foodOrder.quantity * foodOrder.singleUnitPrice
        state.orderSubTotal += foodOrder.foodTotal
        state.numOfItems += foodOrder.quantity
      })
      sessionStorage.setItem('order', JSON.stringify(state))
    },

    updateFoodOrderByIndex: (state, {payload}) => {
      state.foodOrderArr = state.foodOrderArr.map((foodOrder, idx) => {
        if(idx !== payload.index){
          return foodOrder
        }
        return payload.updatedFood
      })
      state.orderSubTotal = 0
      state.numOfItems = 0
      state.foodOrderArr.map(foodOrder => {
        foodOrder.foodTotal = foodOrder.quantity * foodOrder.singleUnitPrice
        state.orderSubTotal += foodOrder.foodTotal
        state.numOfItems += foodOrder.quantity
      })
      sessionStorage.setItem('order', JSON.stringify(state))
    },

    clearOrder: (state) => {
      sessionStorage.removeItem('order')
      return emptyOrder
    },
  }
})

export const { 
  addToOrder, 
  deleteFromOrder, 
  deleteFoodItemByIndex, 
  updateFoodOrder, 
  updateFoodOrderByIndex,
  updateOrderInfo, 
  clearOrder 
} = orderSlice.actions
export default orderSlice.reducer