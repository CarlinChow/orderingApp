const mongoose = require('mongoose')
const foodSchema = require('./foodSchema')

//  single food item with extra parameters for ordering
const foodOrderSchema = mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  food: {
    type: foodSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  singleUnitPrice: Number,
  note: String,
  foodTotal: Number,
})

const orderSchema = mongoose.Schema({
  orderNum: Number,
  name: {
    type: String,
    required: true,
  },
  telephoneNum:{
    type: String,
    required: true,
  },
  foodOrderArr: {
    type: [foodOrderSchema],
    required: true
  },
  numOfItems: {
    type: Number,
    required: true,
  },
  orderSubTotal: Number,
  pickUpTime: {
    type: String,
    required: true,
  },
  status: String,
  complete: Boolean,
  specialInstructions: String,
  utensils: Number
},{
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)