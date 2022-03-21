const mongoose = require('mongoose')

const timeSlotsSchema = mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  startingQuantity: {
    type: Number,
    required: true,
  },
  currentQuantity: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('TimeSlots', timeSlotsSchema)