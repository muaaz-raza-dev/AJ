const Respond = require("../Helpers/ResponseHandler")
const OneTimeFee = require("../models/OneTimeFee")
const PaymentConfig = require("../models/PaymentConfigs")
const CalculateAllMonths = require("./utils/Stats/CalculateAllMonths")
const { CalculateNewAdmissions } = require("./utils/Stats/CalculateNewAdmissions")
const { CalculateTotalRevenue } = require("./utils/Stats/CalculateTotalRevenue")
const { CalculateTotalStudents } = require("./utils/Stats/CalculateTotalStduents")
const GetDailyChartReport = require("./utils/Stats/charts/GetDailyChartReport")
const {  GetMonthlyChartReport } = require("./utils/Stats/charts/GetMonthlyChartReport")
const CalculateAllStatFilters = require("./utils/Stats/FilteredData/CalculateAllStatFilters")
const {CalculateMonthlyFeeReport} = require("./utils/Stats/FilteredData/CalculateMonthlyFeeReport")
const CalculateYearlyFeeReport = require("./utils/Stats/FilteredData/CalculateYearlyFeeReport")
const GeneralStats = async(req,res)=>{
try{
let totalStudents  = await CalculateTotalStudents()
let newAdmissions = await CalculateNewAdmissions()
let MonthlyRevenue = await CalculateTotalRevenue()
let Dates  =await CalculateAllMonths() // From the beggining of the software. {2024:["may","june","july"]}
let FstatsFilters = await CalculateAllStatFilters(true) // For filterable Stats
Respond({res,payload:{totalStudents,newAdmissions,MonthlyRevenue,Dates,FstatsFilters}})
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

const FilterableConfigStats = async(req,res)=>{
let {PaymentConfig:paymentConfig,month,year,Session,Class,feeFrequency} = req.body
let Config = await PaymentConfig.findById(paymentConfig).select("-createdAt -updatedAt ")
if(!Config) return Respond({res,success:false,status:404,message:"Payment Config not found. Try again later!"})
let payload ; // no of Student not the amount
if(feeFrequency == "Custom"||feeFrequency == "Monthly"){
payload = await CalculateMonthlyFeeReport(Config,month,year,(Class=="all"?"":Class),Session)
}
else {
payload = await CalculateYearlyFeeReport(Config,Session)
}
Respond({res,payload,})
}
module.exports = {GeneralStats,MonthlyChartReport,DailyChartReport,FilterableConfigStats}