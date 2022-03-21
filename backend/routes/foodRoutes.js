//  @route: /api/food
const express = require('express')
const router = express.Router()
const {
  getFoodsItem,
  addFoodItem,
  updateFoodItem, 
  deleteFoodItem,
  getFoodItem,
} = require('../controllers/foodController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getFoodsItem).post(protect, addFoodItem)

router.route('/:id').get(protect, getFoodItem).put(protect, updateFoodItem).delete(protect, deleteFoodItem)

module.exports = router