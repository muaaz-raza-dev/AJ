const CalculateClassHistory = require("./utils/history/CalculateClassHistory")
const Respond = require("../Helpers/ResponseHandler")
const {CalculateTotalPaymentHistory,AnalyzeFilters} = require("./utils/history/CalculateTotalPaymentHistory")
const Students = require("../models/Students")
const { AnalyzePaymentHistory } = require("./utils/history/AnalyzePaymentHistory")
const { CalculateFrequentDues, CalculateOneTimeDues } = require("./utils/Transaction/CalculateFeeDues.utils")

const InitialHistoryData=async(req,res)=>{ //? Intial data = FIlters + small data
let {id}=req.params
try {
    if(id.length!=24) return res.status(404).json({message:"Student Not Found"})
    let studentInformation = await Students.findById(id).select("FirstName LastName DOA GRNO ConsiderOneTimeFee") 
    if(!studentInformation) return res.status(404).json({message:"Student Not Found"})
        let ClassHistory = await CalculateClassHistory(id)
    let { Dues ,Paid } = await CalculateTotalPaymentHistory(id)
    let filters = await AnalyzeFilters(id,studentInformation)
    Respond({res,payload:{ClassHistory,studentInformation,Dues ,Paid,filters}})
} 
catch(err){
    res.status(404).json({message:"Student Not Found"})
}
}
const GetDuesHistory = async(req,res)=>{
let {studentId} =req.body 
let studentInfo = await Students.findById(studentId)
let FrequentDues  = await CalculateFrequentDues(studentInfo)  
let OneTimeDues = await CalculateOneTimeDues(studentInfo)
let Dues = FrequentDues.concat(OneTimeDues||[])
Respond({res,payload:Dues})
}
const GetPaymentHistory= async(req,res) =>{
let  {feeType:feeFrequency,paymentConfig,studentId} = req.body
let studentInformation = await Students.findById(studentId)
if(!studentInformation) return res.status(404).json({message:"Student Not Found"})
let History  =await AnalyzePaymentHistory(paymentConfig,feeFrequency,studentInformation)
Respond({res,payload:History})
}



module.exports = {InitialHistoryData,GetPaymentHistory,GetDuesHistory}