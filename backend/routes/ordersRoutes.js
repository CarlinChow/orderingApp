const express = require('express')
const router = express.Router()
const {
  getOrders,
  getOrderById,
  postOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/ordersController')
const { protect } = require('../middleware/authMiddleware')

/// @route: /api/orders
router.route('/').get(protect, getOrders).post(protect, postOrder)

//  @route: /api/orders/:id
router.route('/:id').get(protect, getOrderById).put(protect, updateOrder).delete(protect, deleteOrder)

module.exports = router