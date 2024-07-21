const Class = require("../../../models/Class")
const PaymentConfig = require("../../../models/SchoolPayments")
const Sections_Class = require("../../../models/Sections_Class")
const Session = require("../../../models/Session")
const Students = require("../../../models/Students")
const Transactions = require("../../../models/Transactions")
const {ObjectId} = require("mongodb")
const moment = require("moment")
const lod = require("lodash")
const OneTimeFee = require("../../../models/OneTimeFee")
const CalculateTotalPaymentHistory=async(studentId)=>{ //! main controller
    let {Dues,Paid} = await CalculateDues(studentId)
    return {Dues,Paid}
}

async function CalculateDues (studentId) {
let totalDues = 0  //! Final result
let totalPaid = 0 
let totalAmountToPay = 0
let ClassSessionPair = {}
let StudentDetails =await Students.findById(studentId)
let totalClasses =(await Sections_Class.find({Students:studentId}).populate({path :"Class",select:"_id"})).map(e=>e.Class._id) //total Classes in which the fukin student was
let totalSessions =await Session.find({Classes:{$in:totalClasses}}).select("_id Classes")
totalSessions.forEach(ses=>{
    totalClasses.forEach(id=>{
        if(ses.Classes.includes(id.toString())){
          //session Id : Class._id
            ClassSessionPair[ses._id.toString()] = id.toString()
        }
    })
}) // to allocate the key value pairs to ClassSessionPair
totalAmountToPay = await CalculatePaymentAppliedAllTime(totalSessions,ClassSessionPair,StudentDetails) //! to calculate total amount to pay all time
let {totalDiscounts,totalAmount} = await CalculateTotalPaidAmountAllTime(studentId,StudentDetails) 
totalPaid = totalAmount ;
totalAmountToPay = totalAmountToPay - totalDiscounts
totalDues = totalAmountToPay - totalPaid 
return {Dues :totalDues ,Paid:totalPaid}
}

async function CalculatePaymentAppliedAllTime (totalSessions,ClassSessionPair,StudentDetails){
let totalAmountToPay= 0
let RegisteredPayments_AllTime = (await PaymentConfig.find({session:{$in:totalSessions}})) 
let ConsiderOneTimeFee = StudentDetails.ConsiderOneTimeFee
// ? To calculat the amount of One Time Fee
if(ConsiderOneTimeFee){
  let OneTimeFees = await OneTimeFee.find({session:StudentDetails.firstSession})
  OneTimeFees.map(config=>{
    if(config.feeStatus.includes("Different")){
     let amount=config.classes.find(cl=>cl.classId.toString()==ClassSessionPair[config.session].toString()).amount
      totalAmountToPay += amount
    }
    else { totalAmountToPay = config.classes[0].amount}
  })
}
// Ends

RegisteredPayments_AllTime.forEach(config=>{
        let amountToPay= 0
        if(config.feeStatus.includes("Different")) {
          amountToPay= config.classes.find(cl=>cl.classId.toString()== ClassSessionPair[config.session.toString()]).amount
        }
        else { amountToPay=config.classes[0].amount}
        if(config.feeFrequency=="Monthly"||config.feeFrequency=="Custom") {
                config.paymentMonths.map(pay=>{
                    let paymentDate = moment (pay.paymentDate)
                    let currentDate = moment ()
                    if(pay.isPayment&&paymentDate.isSameOrBefore(currentDate)){
                        totalAmountToPay += amountToPay 
                    }
                })
        }
        else if(config.feeFrequency=="Yearly"){ 
          let TrDate = moment(config.paymentDate)
          let todayDate = moment()
          if (TrDate.isSameOrBefore(todayDate)) { 
            totalAmountToPay += amountToPay 
          }
        }
})
return totalAmountToPay


}


async function CalculateTotalPaidAmountAllTime (studentId){
    let totalDiscounts = 0 ;
    let totalAmount =0 ;
    //not the One Time
    let FrequentFeeTransactions = await Transactions.aggregate([ 
        {
          $match: {
            "Student":new ObjectId(studentId)
          }
        }
        ,
        {
          $unwind: {
            path: "$Transactions",
            preserveNullAndEmptyArrays: false
          }
        } ,{
          $match: {
            "Transactions.paymentType":"Registered",
          }
        }
        ,
        {
            $lookup: {
              from: 'paymentconfigs',
              localField: 'Transactions.paymentConfigId',
              foreignField: '_id',
              as: 'Transactions.paymentConfigId'
            }
          },
          {$unwind:{path:"$Transactions.paymentConfigId",preserveNullAndEmptyArrays:false}}
      ]) ;
      let OneTimeFeeTransactions = await Transactions.aggregate([ 
        {
          $match: {
            "Student":new ObjectId(studentId)
          }
        }
        ,
        {
          $unwind: {
            path: "$Transactions",
            preserveNullAndEmptyArrays: false
          }
        } ,{
          $match: {
            "Transactions.paymentType":"Registered",
          }
        }
        ,
        {
            $lookup: {
              from: 'onetime-fees',
              localField: 'Transactions.paymentConfigId',
              foreignField: '_id',
              as: 'Transactions.paymentConfigId'
            }
          },
          {$unwind:{path:"$Transactions.paymentConfigId",preserveNullAndEmptyArrays:false}}
      ])

      FrequentFeeTransactions.map(tr=>{
      let feeFrequency =tr.Transactions.paymentConfigId.feeFrequency 
      if(feeFrequency== "Monthly" ||feeFrequency=="Custom") {
        let TrDate = moment(`1-${tr.Transactions.month}-${tr.Transactions.year}`,"D-MMMM-YYYY")
        let todayDate = moment()
        if (tr && TrDate.isSameOrBefore(todayDate)) {
          totalDiscounts += tr.Transactions.amount.discount       
          totalAmount += tr.Transactions.amount.totalAmount       
        }
      }
     else if(feeFrequency) {
      let TrDate = moment(tr.Transactions.paymentConfigId.paymentDate)
      let todayDate = moment()
      if (TrDate.isSameOrBefore(todayDate)) { 
        totalDiscounts += tr.Transactions.amount.discount       
        totalAmount += tr.Transactions.amount.totalAmount
      }

     } 
    }) 
    OneTimeFeeTransactions.map(tr=>{
      totalDiscounts += tr.Transactions.amount.discount       
      totalAmount += tr.Transactions.amount.totalAmount
    })
 return {totalDiscounts ,totalAmount}
}


async function AnalyzeFilters  (studentId,stdInformation) {
let Payload = {Sessions:[],PaymentConfigs:{},feeTypes:[]}
//*  PaymentConfigs : {sessionId : {MonthlyFee : [{label:name , value:paymentconfigId}]}}
let Classes = (await Sections_Class.find({Students:studentId,}).select("Class")).map(e=>e.Class.toString())
let sessions = await Session.find({Classes:{$in:Classes}}).select("_id session_name acedmic_year")
Payload.Sessions=sessions.map(s=>({value:s._id.toString() , label:`${s.session_name} ${s.acedmic_year}`})) 

let paymentConfigs = await PaymentConfig.find({session:{$in:sessions.map(e=>e._id)}}).select("_id feeFrequency feeTitle paymentDate session")
Payload.feeTypes.push(...Object.keys(lod.groupBy(paymentConfigs,(({feeFrequency})=>feeFrequency))))

paymentConfigs.forEach(config=>{
  if(!Payload.PaymentConfigs[config.session]){Payload.PaymentConfigs[config.session]={}}
  if(!Payload.PaymentConfigs[config.session][config.feeFrequency]) Payload.PaymentConfigs[config.session][config.feeFrequency] = []
  Payload.PaymentConfigs[config.session][config.feeFrequency].push({  value:config._id.toString(), label:config.feeTitle})
})
if(stdInformation.ConsiderOneTimeFee){Payload.feeTypes.push("One Time")}
return Payload

}



module.exports ={ CalculateTotalPaymentHistory ,AnalyzeFilters }