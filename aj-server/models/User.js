const mongoose= require("mongoose");
const bcrypt = require("bcryptjs");
const {ObjectId} = require("mongodb")
const UserSchema = new mongoose.Schema({
  username:{type:String,unique:true,trim:true,required:true},
  photo:{type:String},
  Role:{ 
    type: String,
    enum: ['admin', 'chief admin', 'user','student'],
    default: 'user'
  },
  email:{type:String},
  password:{type:String, required: true},
  Name:String,
  LastLogin:{type:String},
  isLogOutRequired:{type:Boolean,default:false},
  isBlocked:{type:Boolean,default:false},
  StaffId:{type:ObjectId , ref:"Teacher"},
});

// UserSchema.pre("save",async function(next){
//   const user = this;
//   if(user.isModified("password")){
//     user.password = await bcrypt.hash(user.password, 10);
//   }
//   next();
// })

UserSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("User", UserSchema);