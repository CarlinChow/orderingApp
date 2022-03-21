const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

//  @desc: get orders from database
//  @route: GET /api/orders
const getOrders = asyncHandler( async(req, res) => {
  const orders = await Order.find().sort({'_id': 1})
  res.status(200).json(orders)
})

//  @desc: get an order by ID from database
//  @route: GET /api/orders/:id
const getOrderById = asyncHandler( async(req, res) => {
  const orders = await Order.findById(req.params.id)
  res.status(200).json(orders)
})


//  @desc: add an order to the database
//  @route: POST /api/orders
const postOrder = asyncHandler( async(req, res) => {
  if(!req.body){
    req.status(400)
    throw new Error('Please fill in the required fields')
  }
  const newOrder = await Order.create(req.body)
  res.status(200).json(newOrder)
})

//  @desc: update an order by ID in database
//  @route: PUT /api/orders/:id
const updateOrder = asyncHandler( async(req, res) => {
  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(400)
    throw new Error("Order not found")
  }
  
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedOrder)
})

//  @desc: Delete an order by ID in database
//  @route: DELETE /api/orders/:id
const deleteOrder = asyncHandler( async(req, res)=> {
  const order = await Order.findById(req.params.id)
  if(!order){
    res.status(400)
    throw new Error("Order not found")
  }

  await order.remove()
  res.status(200).json({_id: req.params.id})
})


module.exports = {
  getOrders,
  getOrderById,
  postOrder,
  updateOrder,
  deleteOrder
}