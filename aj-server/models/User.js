const mongoose= require("mongoose");
const {ObjectId} = require("mongodb")
const UserSchema = new mongoose.Schema({
  username:{type:String,unique:true,trim:true,required:true},
  photo:{type:String},
  Role:{ 
    type: String,
    enum: ['admin', 'chief admin', 'user',],
    default: 'user'
  },
  email:{type:String},
  password:{type:String, required: true },
  Name:String,
  LastLogin:{type:[String]},
  isBlocked:{type:Boolean,default:false},
  StaffId:{type:ObjectId , ref:"Teacher"},
});
module.exports = mongoose.model("User", UserSchema);