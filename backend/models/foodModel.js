const mongoose = require('mongoose')
const foodSchema = require('./foodSchema')

module.exports = mongoose.model('Food', foodSchema)