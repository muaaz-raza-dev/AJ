const Session = require("../../../models/Session")
const Students = require("../../../models/Students")
const { PercentageCalculator } = require("./CalculateTotalRevenue")

const CalculateTotalStudents = async() =>{
const totalStudents = await Students.countDocuments({TerminateEnrollment:false})
const Sessions =await Session.find().sort({"start_date":-1}).limit(2).select("_id start_date end_date")  // ? the recent will come at first i.e index = 0
async function StudentCountSessioned(Session){
const end_date = new Date(Session.end_date).toISOString()
const students = await Students.countDocuments({createdAt:{$lte:end_date}})
const terminatedStudents = await Students.countDocuments({TerminateEnrollment:true,TerminationDate:{$lte:end_date}})
const totalStudentCount =students -terminatedStudents
return totalStudentCount  //? to avoid zero error of math undefined i.e 1/0 = math undefined
}
const recentSessionStd =await StudentCountSessioned(Sessions[0]) 
const prevSessionStd = await StudentCountSessioned(Sessions[1]) 


let rate = PercentageCalculator(recentSessionStd,prevSessionStd)
return {total:totalStudents ,rate}
}

module.exports = {CalculateTotalStudents}