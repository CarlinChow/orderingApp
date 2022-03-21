const express = require('express')
const router = express.Router()
const {
  getTimeSlots,
  postTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} = require('../controllers/timeSlotsControllers.js')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(getTimeSlots).post(protect, postTimeSlot)

router.route('/:id').put(protect, updateTimeSlot).delete(protect, deleteTimeSlot)

module.exports = router