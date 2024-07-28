const Session = require("../../../models/Session")
const Students = require("../../../models/Students")
const { PercentageCalculator } = require("./CalculateTotalRevenue")

const CalculateNewAdmissions = async()=>{
let newAdmissions = await Students.countDocuments({NewAdmission:true})
const Sessions =await Session.find().sort({"start_date":-1}).limit(2).select("_id start_date end_date")  // ? the recent will come at first i.e index = 0

async function newAdmissionsCountSessioned(Session){
let end_date = new Date(Session.end_date).toISOString()
let start_date = new Date(Session.start_date).toISOString()
const newAdmissions = await Students.countDocuments({DOA:{$gte:start_date, $lte:end_date}})
return newAdmissions  
}

let prevAdmissions = await newAdmissionsCountSessioned(Sessions?.[0])
let recentAdmissions = await newAdmissionsCountSessioned(Sessions?.[1])
 const rate = PercentageCalculator(prevAdmissions,recentAdmissions)
return {total:newAdmissions ,rate}
}

module.exports = {CalculateNewAdmissions}