const TimeSlots = require('../models/timeSlotsModel')
const asyncHandler = require('express-async-handler')

//  @desc: get timeslots from db 
//  @route: GET /api/timeslots
//  @access: PUBLIC
const getTimeSlots = asyncHandler( async (req , res) => {
  const timeSlots = await TimeSlots.find().sort({'time': 1})

  res.status(200).json(timeSlots)
})

//  @desc: post a new timeslot to db 
//  @route: POST /api/timeslots
//  @access: PRIVATE
const postTimeSlot = asyncHandler( async (req , res) => {
  if(!req.body){
    req.status(400)
    throw new Error('Please fill in all required fields')
  }
  const newTimeSlot = await TimeSlots.create(req.body)
  res.status(200).json(newTimeSlot)
})

//  @desc: update a timeslot in db 
//  @route: PUT /api/timeslots/:id
//  @access: PRIVATE
const updateTimeSlot = asyncHandler( async (req , res) => {
  const timeSlot = await TimeSlots.findById(req.params.id)
  if(!timeSlot){
    res.status(400)
    throw new Error('Time Slot not found')
  }

  const updatedTimeSlot = await TimeSlots.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedTimeSlot)
})

//  @desc: delete a timeslots from db 
//  @route: DELETE /api/timeslots/:id
//  @access: PRIVATE
const deleteTimeSlot = asyncHandler( async (req , res) => {
  const timeSlot = await TimeSlots.findById(req.params.id)
  if(!timeSlot){
    res.status(400)
    throw new Error('Time slot not found')
  }

  await TimeSlots.findByIdAndDelete(req.params.id)

  res.status(200).json({_id: req.params.id})
})

module.exports = {
  getTimeSlots,
  postTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
}