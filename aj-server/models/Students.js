const mongoose = require("mongoose");
const {ObjectId} = require("mongodb")
const registerFormSchema = new mongoose.Schema({
  FirstName: { type: String, required: true ,text:true},
  LastName: { type: String, },
  photo: { type: String,default:"https://res.cloudinary.com/dz8a9sztc/image/upload/v1711541749/students_dpw9qp.png"},
  email: { type: String,},
  contact: { type: [String] },
  fatherName: { type: String, required: true },
  DOB: { type: String, required: true }, // Consider using Date type if you store actual dates
  Gender: { type: String },
  Address: { type: String },
  GRNO: { type: String,unique:true},
  RollNo: { type: Number,required:true},
  CurrentSection: { type: ObjectId , ref:"Section" },
  NewAdmission: { type: Boolean, },
  CovidVaccine: { type: Boolean, },
  sCNIC: { type: String, },
  fCNIC: { type: String, },
  mCNIC: { type: String, },
  WA:{type:String}, //whastapp number
  firstSession:{type:ObjectId,ref:"YearlySession"},
  firstClass:{type:ObjectId,ref:"Class"},
  ConsiderOneTimeFee:Boolean,
  DOA: { type: String, required: true }, // Consider using Date type if you store actual dates
  CurrentClass: { type: ObjectId, required: true , ref:"Classes" },
  PolioPermission: { type: Boolean, } ,
}, { timestamps: true });

module.exports = mongoose.model('Students', registerFormSchema);
