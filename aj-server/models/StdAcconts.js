const mongoose= require("mongoose");
const bcrypt = require("bcryptjs");
const {ObjectId} = require("mongodb")
const StdAccountSchema = new mongoose.Schema({
  GRNO:{type:String,unique:true,trim:true,required:true},
  email:{type:String},
  photo:String,
  Name:String,
  password:{type:String, required: true},
  LastLogin:{type:String},
  isSkipPassword:Boolean,
  OTP:Number,
  isLogOutRequired:{type:Boolean,default:false},
  isBlocked:{type:Boolean,default:false},
  Student:{type:ObjectId , ref:"Students",required:true},
});

StdAccountSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}
StdAccountSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next()    
})

module.exports = mongoose.model("StdAccounts", StdAccountSchema);