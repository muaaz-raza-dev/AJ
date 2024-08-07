const {ObjectId} = require("mongodb");
const Students = require("../../../../models/Students");
const Transactions = require("../../../../models/Transactions");

function GetAdditionalTransactionPopulationStages (Class){
  let ClassBasedTransactionPopulationStages  = []
  if(Class){

  
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
      "Student.CurrentClass": new ObjectId(Class),
  }
}
]
  }
return ClassBasedTransactionPopulationStages
}

const CalculateMonthlyFeeReport = async(paymentConfig,month,year,Class) => {
let Query ={}
if(Class){ Query.CurrentClass = Class}
const totalStudents = await Students.countDocuments({TerminateEnrollment:false,...Query})
const totalTransactions =await Transactions.aggregate([
...GetAdditionalTransactionPopulationStages(Class),
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

module.exports = CalculateMonthlyFeeReport