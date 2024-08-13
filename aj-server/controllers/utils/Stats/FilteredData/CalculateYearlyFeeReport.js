const Students = require("../../../../models/Students");
const Transactions = require("../../../../models/Transactions");
const {ObjectId} = require("mongodb")
const Session = require("../../../../models/Session");
const { GetAdditionalTransactionPopulationStages } = require("./CalculateMonthlyFeeReport");
const Sections_Class = require("../../../../models/Sections_Class");


const CalculateYearlyFeeReport = async(paymentConfig,session,Class) => {
const StudentIds = []
if(Class){
  const sections =await Sections_Class.find({Class}).select("Students")
  sections.map(sec=>StudentIds.push(...sec.Students))
}
  else {
  const Sess = await Session.findById(session).populate({path:"Classes",select:"sections",populate:{path:"sections",select:"Students"}}).select("Classes")
  Sess.Classes.forEach(cl=>cl.sections.forEach(sec=>{sec.Students.forEach(std=>StudentIds.push(std.toString()))
  }))
}

const totalStudents = await Students.countDocuments({TerminateEnrollment:false,_id:{$in:StudentIds}})

const totalTransactions = await Transactions.aggregate([
... ( GetAdditionalTransactionPopulationStages(StudentIds)),
    {
      $unwind: {
        path: "$Transactions",
        preserveNullAndEmptyArrays: false
      } 
    } ,
    {
        $match: {
          "Transactions.paymentType":"Registered",
          "Transactions.paymentConfigId":new ObjectId(paymentConfig._id),
          "isCancelled":false,
        }
      },
])

let PendingStudents = totalStudents-totalTransactions.length
const payload =[
{value:totalTransactions.length,label:"Fees Paid by Students",
percentage:totalTransactions/totalStudents *100,
},
{value:totalStudents-totalTransactions.length,label:"Pending Student Fees",
  percentage:PendingStudents/totalStudents *100,
}
]

return payload
}

module.exports = CalculateYearlyFeeReport