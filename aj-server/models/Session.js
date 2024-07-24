const mongoose = require('mongoose');
const {ObjectId} =require("mongodb")
const YearlySessionSchema = new mongoose.Schema({
  session_name: {
    type: String,
    required: true,
    trim: true,
  },
  acedmic_year : {
  type: String,
    required: true,
    trim: true},

  start_date: {
    type: String,
    required: true,
  },
  session_description:{
    type: String,
    trim: true,
  },
  end_date: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  Classes : {type:[ObjectId],ref:"Classes"} ,
  createdBy: {
    type: ObjectId,
    ref: 'User', // Assuming a User model exists
  },
},{timestamps:true});


module.exports = mongoose.model('YearlySession', YearlySessionSchema);