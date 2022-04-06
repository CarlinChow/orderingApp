import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: "/api",
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      if(getState().auth.user !== null){
        const { token } = getState().auth.user
        if(token) {
          headers.set('authorization', `Bearer ${token}` )
        }
      }

      return headers
    }
      
  }),
  tagTypes: ['Food', 'Order', 'TimeSlot'],
  endpoints: (builder) => ({

    // Endpoints for query/mutate food items 
    getFoods: builder.query({
      query: () => '/food',
      providesTags: ['Food'],
    }),
    getFoodByID: builder.query({
      query: id => `/food/${id}`,
      providesTags: ['Food'],
    }),
    postFood: builder.mutation({
      query: food => ({
        url: '/food',
        method: "POST",
        body: food
      }),
      invalidatesTags: ['Food'],
    }),
    updateFood: builder.mutation({
      query: ({_id, ...food}) => ({
        url: `/food/${_id}`,
        method: "PUT",
        body: food
      }),
      invalidatesTags: ['Food'],
    }),
    deleteFood: builder.mutation({
      query: id => ({
        url: `/food/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Food'],
    }),
    
    // endpoints for query/mutate orders 
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order']
    }),
    getOrderByID: builder.query({
      query: id => `/orders/${id}`,
      providesTags: ['Order']
    }),
    postOrder: builder.mutation({
      query: order => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order']
    }),
    updateOrder: builder.mutation({
      query: ({_id, ...order}) => ({
        url: `/orders/${_id}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: ['Order']
    }),
    deleteOrder: builder.mutation({
      query: id => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Order']
    }),

    // endpoints for authentication
    registerUser: builder.mutation({
      query: ({name, password}) => ({
        url: '/users',
        method: 'POST',
        body: {
          name: name,
          password: password,
        }
      }),
    }),
    loginUser: builder.mutation({
      query: ({name, password}) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          name: name,
          password: password,
        }
      })
    }),

    //  endpoints for timeslots
    getTimeSlots: builder.query({
      query: () => '/timeslots',
      providesTags: ['TimeSlot']
    }),
    postTimeSlot: builder.mutation({
      query: timeSlot => ({
        url: '/timeslots',
        method: 'POST',
        body: timeSlot,
      }),
      invalidatesTags: ['TimeSlot']
    }),
    updateTimeSlot: builder.mutation({
      query: ({_id, ...timeSlot}) => ({
        url: `/timeslots/${_id}`,
        method: 'PUT',
        body: timeSlot,
      }),
      invalidatesTags: ['TimeSlot']
    }),
    deleteTimeSlot: builder.mutation({
      query: id => ({
        url: `/timeslots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TimeSlot']
    }),
  }),
})

export const { 
  useGetFoodsQuery,
  useGetFoodByIDQuery,
  usePostFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useGetOrdersQuery,
  useGetOrderByIDQuery,
  usePostOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetTimeSlotsQuery,
  usePostTimeSlotMutation,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
  } = api