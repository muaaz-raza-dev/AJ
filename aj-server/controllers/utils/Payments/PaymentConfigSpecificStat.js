const Students = require("../../../models/Students")


const PaymentConfigSpecificStat = async(Config) => {
let Stats = {totalStudents:0,AveragePerStudent:0,TotalPerMonth:0,TotalPerYear:0};


let feeFrequency = Config.feeFrequency
let isSameAmount = Config.feeStatus.toLowerCase().includes("same") 
Stats.totalStudents= await Students.countDocuments({TerminateEnrollment:false});
let TimesInYear = 1  //? in case of yealry or one time payment

if(feeFrequency == "Monthly"||feeFrequency=="Custom") {
TimesInYear = Config.paymentMonths.filter(pm=>pm.isPayment).length
}


if(isSameAmount) {
Stats.TotalPerMonth = Stats.totalStudents * Config.classes[0].amount
}
else {
let ClassBasedAmounts = {}
Config.classes.forEach((cl)=>{
ClassBasedAmounts[cl.classId._id.toString()] ={ amount : cl.amount ,students:cl.classId.sections.reduce((a,sec)=>a+sec.Students.length,0)}
})
let TotalPerMonth = 0
Object.values(ClassBasedAmounts).forEach(e=>{
    let { amount, students} = e
    TotalPerMonth += amount * students
})
Stats.TotalPerMonth = TotalPerMonth
}



Stats.TotalPerYear = Stats.TotalPerMonth * TimesInYear
Stats.AveragePerStudent = Stats.TotalPerYear / Stats.totalStudents


return Stats    
}

module.exports= PaymentConfigSpecificStat