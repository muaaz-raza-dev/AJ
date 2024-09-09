const mongoose= require("mongoose");
const bcrypt = require("bcryptjs");
const {ObjectId} = require("mongodb")
const StdAccountSchema = new mongoose.Schema({
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
  logins: [
    {
      locationInfo: {
        city: String,
        country: String,
        lat: Number,
        lon: Number
      },
      ip: {
        type: String,
        required: true
      },
      deviceInfo: {
        platform: String,
        os: String,
        browser: String
      }
    }

  ]
});

StdAccountSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}



module.exports = mongoose.model("StdAccounts", StdAccountSchema);