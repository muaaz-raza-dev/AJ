const {ObjectId} = require("mongodb");
const Students = require("../../../../models/Students");
const Transactions = require("../../../../models/Transactions");
const Session = require("../../../../models/Session");
const Sections_Class = require("../../../../models/Sections_Class");

function GetAdditionalTransactionPopulationStages (StudentsIds){

      ClassBasedTransactionPopulationStages = [{
          $lookup: {
              from: "students",
              localField: "Student",
              foreignField: "_id",
              as: "Student"
          }
      } ,
      {
    $unwind: {
    path: "$Student",
    preserveNullAndEmptyArrays: false
  },
},
{
  $match: {
      "Student._id":{$in:StudentsIds},
  }
}
]

return ClassBasedTransactionPopulationStages
}

const CalculateMonthlyFeeReport = async(paymentConfig,month,year,Class,session) => {
const StudentIds = []
if(!Class){
const Sess = await Session.findById(session).populate({path:"Classes",select:"sections",populate:{path:"sections",select:"Students"}}).select("Classes")
Sess.Classes.forEach(cl=>cl.sections.forEach(sec=>{sec.Students.forEach(std=>StudentIds.push(std))
}))

}
else {
const sections =await Sections_Class.find({Class}).select("Students")
sections.map(sec=>StudentIds.push(...sec.Students))
}
const totalStudents = await Students.countDocuments({TerminateEnrollment:false,_id:{$in:StudentIds}})

const totalTransactions =await Transactions.aggregate([
...( GetAdditionalTransactionPopulationStages(StudentIds)),
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
          "Transactions.month":month,
          "Transactions.year":year,
          "isCancelled":false,
        }
      },
      {
        $project:{
          Invoice:1
        }
      }
  ])

let PendingStudents = totalStudents-totalTransactions.length
const payload =[{value:totalTransactions.length,label:"Fees Paid by Students",
  percentage:totalTransactions.length/totalStudents *100,
},{value:PendingStudents,label:
  "Pending Student Fees",
  percentage:PendingStudents/totalStudents *100,
}]
return payload
}

module.exports = {CalculateMonthlyFeeReport,GetAdditionalTransactionPopulationStages}