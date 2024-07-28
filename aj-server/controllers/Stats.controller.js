const Respond = require("../Helpers/ResponseHandler")
const CalculateAllMonths = require("./utils/Stats/CalculateAllMonths")
const { CalculateNewAdmissions } = require("./utils/Stats/CalculateNewAdmissions")
const { CalculateTotalPendings } = require("./utils/Stats/CalculateTotalPendings")
const { CalculateTotalRevenue } = require("./utils/Stats/CalculateTotalRevenue")
const { CalculateTotalStudents } = require("./utils/Stats/CalculateTotalStduents")
const GetDailyChartReport = require("./utils/Stats/charts/GetDailyChartReport")
const {  GetMonthlyChartReport } = require("./utils/Stats/charts/GetMonthlyChartReport")
const moment = require("moment")
const GeneralStats = async(req,res)=>{
try{
let totalStudents  = await CalculateTotalStudents()
let newAdmissions = await CalculateNewAdmissions()
let MonthlyRevenue = await CalculateTotalRevenue()
let PendingPayments  = await CalculateTotalPendings()
let Dates  =await CalculateAllMonths() // FRom the beggining of the software. {2024:["may","june","july"]}
Respond({res,payload:{totalStudents,newAdmissions,MonthlyRevenue,PendingPayments,Dates}})
}
catch(err){
console.log(err);
Respond({res,error:err,status:501,message:"Somthing went wrong."})
}
}

const MonthlyChartReport = async(req,res)=>{
let {duration} = req.body
try{
    let data = await GetMonthlyChartReport(duration)
    Respond({res,payload:data})
}
catch(err){
    console.log(err);
    Respond({res,error:err,status:501,message:"Somthing went wrong."})
}
}


const DailyChartReport = async(req,res)=>{
    let {date} = req.body
    try{
        let data = await GetDailyChartReport(date)
        Respond({res,payload:data})
    }
    catch(err){
        console.log(err);
        Respond({res,error:err,status:501,message:"Somthing went wrong."})
    }
}
module.exports = {GeneralStats,MonthlyChartReport,DailyChartReport}