const moment = require("moment");
const Global_Fee_Preferences = require("../models/Global_Fee_Preferences");
const Students = require("../models/Students");
const TransactionsScema = require("../models/Transactions");
const Students_Finance = require("../models/Students_Finance");
const  CalculateMonthlyFeeRespectToDues  = require("./utils/CalculateMonthlyFeeRespectToDues");
const Respond = require("../Helpers/ResponseHandler");

async function CreateTransaction (req,res){
let  { Transactions  , totalAmount ,PaidAmount,student,PayorsName,Note} =req.body
try {
  const newTransaction = new TransactionsScema({
    Student:student._id, Transaction:Object.values(Transactions),
    totalAmount,
    PaidAmount,
    discountedTotal:req.body.discountedTotal,
    PayorsName,Note,
    RecievedBy:req.AdminId
    // Assuming other required fields are handled or defaulted
  });
  const savedTransaction = await newTransaction.save();
  res.status(201).json(savedTransaction);
} catch (error) {
  res.status(400).json({ message: error.message });
}

}

async function SearchStudent(req,res){
let student = await Students.findOne({GRNO: req.body.GRNO }).select("FirstName LastName email fatherName photo GRNO DOA")
let Dates = {}
let InvoiceNumber = await TransactionsScema.find({}).sort({Invoice:-1})
if (student) {
  let SortedFee_History = await CalculateMonthlyFeeRespectToDues(student._id)
 let b= (await Global_Fee_Preferences.find({})).forEach(elm=>{
    let MOA = moment(student.DOA).month()
    let YOA =  moment(student.DOA).year()
    if (+elm.Year>=YOA ) {
      Dates[elm.Year] = []
      Object.values(elm.Months).map(pre=>{
        console.log(pre.month);
        if(moment.months().indexOf(pre.month)>=MOA){
          Dates[elm.Year].push(pre.month)
        }
      })
    }
  })
  Respond({res,payload:{
    Dates,std:student,Invoice:InvoiceNumber[0]?.Invoice?InvoiceNumber[0].Invoice+1:1,MonthlyFee_history:SortedFee_History
  },})
} 
  else {res.status(404).json({ message: "Student not found" ,payload:{Dates,Invoice:InvoiceNumber[0]?.Invoice?InvoiceNumber[0].Invoice+1:1}});}

}

async function ReadTransactions(req,res){
  let Limit = process.env.TransactionPerRequest
  let {transactionType, searchMode, year, month,  count ,Input:q} = req.body
  try {
    let date = moment(`${month} ${year}`, "MMMM YYYY");
    const formattedDate = date.toISOString()
    const LastDate =  moment(`${month+1} ${year}`, "MMMM YYYY").toISOString();
    let Query= {}
    Query["Time"] = { $gte:formattedDate,
      // $lt:LastDate //todo: Temporary deisabled
     }; //* To make sure it will only returns the treansactions of this month
    if (q) {
      if (searchMode =="Invoice")Query["Invoice"] =q
      else {
        let std = await Students.findOne({GRNO:q})
        Query["Student"]= std?std?._id:"123456789123456789123456"
      }
    }
    else{
      if (transactionType) Query["Transaction"] = { $elemMatch: { purpose: transactionType } };
    }
 let DataLength = await TransactionsScema.countDocuments(Query)
    let transactions = await TransactionsScema.find(Query).populate({path:"Student",select:"FirstName LastName GRNO"}).populate({path:"RecievedBy",select:"Name"}).skip(Limit*(count-1)).limit(Limit).sort("-Time")
    res.json({success:true,payload:transactions,DataLength,count})
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message,success:false });
  }
}

async function ReadTransactionsMeta(req,res){
  const currentMonth = new Date().getMonth() ;
  const currentYear = new Date().getFullYear();
  let startOfMonth = new Date(currentYear, currentMonth , 1);
let numberOfTransactions = await TransactionsScema.aggregate([
  {
    $match: {
      Time: { $gte: startOfMonth, }
    }
  },
{
  $lookup: {
    from: "students",
    localField: "Student",
    foreignField: "_id",
    as: "Student"
  }
},
 {
  $group: {
  _id: "$Student.GRNO",
  Transactions: {
    $push: "$$ROOT"
  },
}} ,
{
  $unwind: {
    path: "$_id",
  }
}
])
let TransactionTypes = await TransactionsScema.aggregate([{
  $unwind: {
    path: "$Transaction",
  }
},{$group: {
  _id: "$Transaction.purpose",
  numberOfTransactions: {
    $sum:1 
  }
}},{$project: {
  "type":"$_id",
  "numberOfTransactions":1,
  "_id":0
}},{
  $sort: {
    "numberOfTransactions": -1
  }
}

])
//* This data is only restricted for current month only.
let amountRecieved = await TransactionsScema.aggregate([  {
  $match: {
    Time: { $gte: startOfMonth, }
  }}
,{$unwind: {path: "$Transaction",}},{$match: {"Transaction.purpose":"Monthly Fee"
  }} ,
  {
    $group: {
      _id: "",
      total: {
        $sum: "$Transaction.amount"
      }
    }
  }
])

let totalAmount = await Students_Finance.aggregate([{$group: {
  _id: "",
  total: {
    $sum: "$MonthlyFee"
  }
}}])
//*To fetch the dates from which it is originated
let Dates = {}
let x= (await Global_Fee_Preferences.find({})).forEach(elm=>
  {
     Dates[elm.Year]=elm.Months.map(month=>month.month)
  }
  )         
  // totalTransactions:number,PendingAmount:number,RecievedAmount:number,PendingTransactions:number
let totalStudents = await Students.countDocuments()
let totalTransactions  = numberOfTransactions?.length ??0
let PendingAmount = totalAmount[0]?.total-amountRecieved[0]?.total??0
res.json({ message: "Transactions for current month", payload:{
  Stats:{
    totalTransactions:numberOfTransactions,RecievedAmount:amountRecieved[0]?.total??0,PendingAmount ,totalTransactions,PendingTransactions:totalStudents-totalTransactions,
  },TransactionTypes,
  Dates} });

}
async function SetTransactionConfig (req,res){
  let {Monthly,Annual,dueDate} = req.body
  try {
    let Find ={Year:moment().year().toString()}
    let payload  = {Monthly,Annual,dueDate}
    let month = moment().format("MMMM")
    // let Config = Global_Fee_Preferences.findOne({Year:moment().year().toString,Months:{$elemMatch:{month}}})
    if(!req.body.month){
     let updated= await Global_Fee_Preferences.findOneAndUpdate(Find,{$push:{Months:{...payload,month}}})
     console.log(updated)
    }
    else{
      await Global_Fee_Preferences.updateOne({...Find,Months:{$elemMatch:{month:req.body.month}}},{"Months.$":payload}) 
    }
    res.json({success:true, message: "updated successfully" });
  } catch (error) {
    console.error("Error setting transaction config:", error);
    res.status(500).json({sucsess:false, message: "Error setting transaction config" });
  }
}
module.exports = {CreateTransaction: CreateTransaction,ReadTransactions,SearchStudent,ReadTransactionsMeta,SetTransactionConfig};