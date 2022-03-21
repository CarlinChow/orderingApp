const Food = require('../models/foodModel')
const asyncHandler = require('express-async-handler')

//  @desc: get items from db 
//  @route: GET /api/food
const getFoodsItem = asyncHandler( async (req , res) => {
  const foodItems = await Food.find()

  res.status(200).json(foodItems)
})

//  @desc: get items from db 
//  @route: GET /api/food/:id
const getFoodItem = asyncHandler( async (req , res) => {
  const foodItem = await Food.findById(req.params.id)

  res.status(200).json(foodItem)
})

//  @desc: add item to db
//  @route: POST /api/food
const addFoodItem = asyncHandler( async (req, res) => {
  if(!req.body){
    req.status(400)
    throw new Error('Please fill in the required fields')
  }
  const food = await Food.create(req.body)
  res.status(200).json(food)
})

//  @desc: update an item in the db
//  @route: PUT /api/food/:id
const updateFoodItem = asyncHandler( async (req, res) => {
  const food = await Food.findById(req.params.id)
  if(!food) {
    res.status(400)
    throw new Error('Food item not found')
  }
  
  const updatedFoodItem = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedFoodItem)
})

//  @desc: delete an item from the database
//  @route: DELETE /api/food/:id
const deleteFoodItem = asyncHandler( async (req, res) => {
  const food = await Food.findById(req.params.id)
  if(!food) {
    res.status(400)
    throw new Error('Food Item not found')
  }

  await food.remove()
  res.status(200).json({ _id: req.params.id })
})

module.exports = {
  getFoodsItem,
  getFoodItem,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
}