const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  price_sm: Number,
  price_md: {
    type: Number,
    required: true,
  },
  price_lg: Number,
  desc: String,
  unique_id: String,
  allergies: [String],
  availability: Boolean
})

module.exports = foodSchema