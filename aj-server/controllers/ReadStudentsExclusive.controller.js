const Respond = require("../Helpers/ResponseHandler")
const Sections_Class = require("../models/Sections_Class")
const Students = require("../models/Students")
const Transactions = require("../models/Transactions")
const EvaluateFeeYearly = require("./utils/CalculateStudentFeeYearly")
const { CalculateTotalPaymentHistory } = require("./utils/history/CalculateTotalPaymentHistory")
async function StudentOverview(req,res){
let GRNO = req.params.GRNO
try {
let Student =await Students.findOne({GRNO})
if(!Student) return res.status(404).json({message:"Student Not Found"})
let RecentTransactions = await Transactions.find({Student:Student._id}).sort({time:-1}).limit(5).select(" Invoice  _id Transactions amount")
let {Dues} = await CalculateTotalPaymentHistory(Student._id)
res.json({payload:{Transactions:RecentTransactions,Student,Dues}}) 
}
catch(err){
    res.status(500).json({message:"An error ocurred while fetching data",error:err})
}
}

async function StudentFeesDetails(req,res){
let {Year,FeeType,GRNO} = req.params
let Student = await Students.findOne({GRNO})
try{
if(Student){
  let payload = await EvaluateFeeYearly(Year,FeeType,Student._id,Student.DOA)
  Respond({res,payload,message:"Fees Details fetched successfully",status:200})
}
else{
    Respond({res,message:"Student Not Found",status:404,success:false})
}}catch(err){
  console.log(err)
    Respond({res,message:"An error ocurred while fetching data",status:500,success:false,error:err})
}
}

// to get the information on the edit page
async function StudentInformationExclusive(req,res){
  let {GRNO} = req.params
let Student = await Students.findOne({GRNO}).select("-__v -createdAt -updatedAt ")
if(!Student) return res.status(404).json({message:"Student Not Found"})
let Response = {...(Student?._doc||Student)}
Respond({res,payload:Response,message:"Student Fetched"})
}


async function EditStudent(req,res) {
 let {payload} = req.body

try{  
  let Student= await Students.findOne({GRNO:+payload.GRNO})
  if(!Student){Respond({res, message: "Student not found", status: 404, success: false});}
  else{
    if(payload.CurrentSection!=Student.CurrentSection.toString()) {
      await Sections_Class.findById(Student.CurrentSection,{$pull:Student._id})
      await Sections_Class.findById(payload.CurrentSection,{$addToset:Student._id})
    }
     await Students.findOneAndUpdate({GRNO: +payload.GRNO}, {$set: payload});
    Respond({res,message:"updated Successfully",success:true})
  }
}
catch(err){console.log(err  );Respond({res,status:501,message:"Internal Server Error",error:err,success:false})}
}


module.exports = {StudentOverview,StudentFeesDetails,StudentInformationExclusive,EditStudent}

  