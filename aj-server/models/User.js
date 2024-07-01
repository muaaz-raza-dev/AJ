const mongoose= require("mongoose");
const {ObjectId} = require("mongodb")
const UserSchema = new mongoose.Schema({
  username:{type:String,unique:true,trim:true,required:true},
  Role:{type: {
    type: String,
    enum: ['admin', 'chief admin', 'teacher'],
    default: 'admin'
  }},
  email:{type:String},
  password:{type:String, required: true },
  Name:String,
  LastLogin:{type:[String]},
  isBlocked:{type:Boolean,default:false},
  Teacher_Id:{type:ObjectId , ref:"Teacher"},
  Student_Id:{type:ObjectId , ref:"Student"},
});
module.exports = mongoose.model("User", UserSchema);