const mongoose= require("mongoose");
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
  LastLogin:{type:[String]}
});
module.exports = mongoose.model("User", UserSchema);