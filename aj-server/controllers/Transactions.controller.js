const moment = require("moment");
const Global_Fee_Preferences = require("../models/Global_Fee_Preferences");
const Students = require("../models/Students");
const TransactionsScema = require("../models/Transactions");
const Students_Finance = require("../models/Students_Finance");

async function CreateTransaction (req,res){
let  { Transactions  , totalAmount ,PaidAmount,student,PayorsName,Note} =req.body
try {
  const newTransaction = new TransactionsScema({
    Student:student._id, Transaction:Object.values(Transactions),
    totalAmount,
    PaidAmount,
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
let students = await Students.findOne({GRNO: req.body.GRNO }).select("FirstName LastName email fatherName photo GRNO DOA")
let Dates = {}
let InvoiceNumber = await TransactionsScema.find({}).sort({Invoice:-1})
if (students) {
  let Fee_Pref =(await Global_Fee_Preferences.find({})).forEach(elm=>{
    let MOA = moment(students.DOA).month()
    let YOA =  moment(students.DOA).year()
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

  res.json({message:"Students fonud",payload:{Dates,std:students,Invoice:InvoiceNumber[0].Invoice?InvoiceNumber[0].Invoice+1:0}}) } 
  else {res.status(404).json({ message: "Student not found" ,payload:{Dates,Invoice:InvoiceNumber[0].Invoice?InvoiceNumber[0].Invoice+1:0}});}

}

async function ReadTransactions(req,res){
  let Limit = process.env.TransactionPerRequest
  let {transactionType, searchMode, year, month, Input, count ,q} = req.body
  try {
    let date = moment(`${month} ${year}`, "MMMM YYYY");
    const formattedDate = date.toISOString()
    const LastDate = date.day(30).toISOString()
    let Query= {}
    Query["Time"] = { $gte:formattedDate,$lte:LastDate }; //* To make sure it will only returns the treansactions of this month
    if (q) {
      if (searchMode =="Invoice")Query["Invoice"] =q
      else Query["GRNO"]={ $regex: q, $options: "i" };
    }
    else{
      if (transactionType) Query["Transaction"] = { $elemMatch: { purpose: transactionType } };
    }
    let transactions = await TransactionsScema.find(Query).skip(Limit*(count-1)).limit(Limit).sort("-Time")
    res.json({success:true,payload:transactions,count})
  } catch (error) {
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
let totalTransactions  = numberOfTransactions.length
let PendingAmount = totalAmount[0].total-amountRecieved[0].total
res.json({ message: "Transactions for current month", payload:{
  Stats:{
    totalTransactions:numberOfTransactions,RecievedAmount:amountRecieved[0].total,PendingAmount ,totalTransactions,PendingTransactions:totalStudents-totalTransactions,
  },
  Dates} });

}

module.exports = {CreateTransaction: CreateTransaction,SearchStudent,ReadTransactionsMeta};