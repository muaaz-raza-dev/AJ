const Respond = require("../Helpers/ResponseHandler")
const Global_Fee_Preferences = require("../models/Global_Fee_Preferences")
const Students = require("../models/Students")
const Students_Finance = require("../models/Students_Finance")
const Transactions = require("../models/Transactions")
const TotalRecordedAmount = require("./utils/CalculateDueAmount.utils")
const moment = require("moment")
const EvaluateFeeYearly = require("./utils/CalculateStudentFeeYearly")
async function StudentOverview(req,res){
let GRNO = req.params.GRNO
try {
let Student =await Students.findOne({GRNO}).select(" DOA FirstName LastName fatherName photo GRNO Class")
if(!Student) return res.status(404).json({message:"Student Not Found"})
let StudentFinance = await Students_Finance.findOne({Student:Student._id})
let AcademicFee = await Global_Fee_Preferences.find({})
let TotalPaidAmount = await Transactions.aggregate([
    {$match: {
      'Student':Student._id
    }},
      {
      $group: {
        _id: null, // Grouping all documents together
        total: { $sum: "$totalAmount" } // Calculate sum of the "amountField"
      }
    }
  ])
let DueAmount =await TotalRecordedAmount(StudentFinance,AcademicFee,Student.DOA) //The amount which is charged from 1st day to now
let FeeCleared =await Transactions.find({Student:Student._id, Transactions: {
    "$elemMatch": {
      "purpose": "Monthly Fee",
      "month":moment.months().indexOf(moment().month())
    }
  }})
  let FeeTypes=await Transactions.aggregate([
    {$match:{Student:Student._id}},
    {$group:{_id:"$Transaction.purpose"}}
  ])
  let yearsPassed = moment().diff(Student.DOA, 'years')+1; // TO onclude current year also
  let Years = Array.from({length:yearsPassed},(_,id)=>id+moment(Student.DOA).year())
  let FeeTypes_response  =FeeTypes.map(e=>e._id)
let RecentTransactions = await Transactions.find({Student:Student._id}).sort({time:-1}).limit(5).select(" Invoice totalAmount _id Transaction ")
res.json({payload:{Dues:DueAmount-(TotalPaidAmount[0]?.total??0),Transactions:RecentTransactions,FeeCleared:FeeCleared.length!=0,Student,FeeTypes:FeeTypes_response.length==0?["Monthly Fee"]:FeeTypes_response.flat(Infinity),Years}}) 
}
catch(err){
  console.log(err)
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


async function StudentInformationExclusive(req,res){
  let {GRNO} = req.params
let Student = await Students.findOne({GRNO}).select("-__v -createdAt -updatedAt ")
let StudentFinance = await Students_Finance.findOne({Student:Student._doc._id}).select("-__v -createdAt -updatedAt -Student")
let Response = {...(Student?._doc||Student), FinancialDetails:{...(StudentFinance?._doc||StudentFinance)}}
delete Response["_id"]
delete Response["FinancialDetails"]["_id"]
Respond({res,payload:Response,message:"Student Fetched",})
}


async function EditStudent(req,res) {
  let {payload} = req.body
try{  let FD = payload.FinancialDetails
  delete FD["AdmissionFee"]["_id"]
  delete payload["FinancialDetails"]
  let StudentExists = await Students.findOne({GRNO:+payload.GRNO})
  if(!StudentExists){Respond({res, message: "Student not found", status: 404, success: false});}
  else{
    let Student = await Students.findOneAndUpdate({GRNO: +payload.GRNO}, {$set: payload});
    let Std_Fin =await Students_Finance.findOne({Student:Student?._id}).select("-Student -_v -createdAt -updatedAt -_id")
    if(Std_Fin&& Object.keys(Std_Fin).some(field=>JSON.stringify(field[Std_Fin])==JSON.stringify(FD[field]))){ 
      Students_Finance.findOneAndUpdate({Student:Student?._id},{$set:FD})
      if(Std_Fin.MonthlyFee!==FD.MonthlyFee){
        let HistoryQuery= {MonthlyFee:{$push:{Fee:FD.MonthlyFee}}}
         StudentsHistory.findOneAndUpdate({Student:Student._id},{$set:HistoryQuery})
      }
    } 
    Respond({res,message:"updated Successfully",success:true})
  }
}
catch(err){console.log(err  );Respond({res,status:501,message:"Internal Server Error",error:err,success:false})}
}


module.exports = {StudentOverview,StudentFeesDetails,StudentInformationExclusive,EditStudent}

  