const Students = require("../../../../models/Students");
const Transactions = require("../../../../models/Transactions");
const {ObjectId} = require("mongodb")
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
        "Student.CurrentClass": mongoose.Types.ObjectId(Class),
    }
}
]
    }
return ClassBasedTransactionPopulationStages
}

const CalculateYearlyFeeReport = async(paymentConfig,session,Class) => {
let Query ={}
if(Class) Query.CurrentClass = Class
const totalStudents = await Students.countDocuments({TerminateEnrollment:false,...Query})
const totalTransactions = await Transactions.aggregate([
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
          "Transaction.session":session, //! needs to be re-checked
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