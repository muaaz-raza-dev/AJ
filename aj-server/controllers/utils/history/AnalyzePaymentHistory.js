const moment = require("moment");
const PaymentConfig = require("../../../models/SchoolPayments");
const Sections_Class = require("../../../models/Sections_Class");
const Session = require("../../../models/Session");
const Transactions = require("../../../models/Transactions");
const OneTimeFee = require("../../../models/OneTimeFee");
const { default: mongoose } = require("mongoose");

const AnalyzePaymentHistory = async(PaymentConfig,feeFrequency,student) => {
    let history = []
    if(feeFrequency=="One Time") {
        history = await CalculateOneTimeFeeHistory(student)
    }
    else  {
        history = await CalculateFrequentDues(PaymentConfig,student)
    }
    return history
}

async function CalculateOneTimeFeeHistory (studentInfo){
    let History = []
    console.log(studentInfo , "Hello");
    if(studentInfo.ConsiderOneTimeFee){
    let OneTimeFees = await OneTimeFee.find({session:studentInfo.firstSession,isDeprecated:false})
    let totalTransactions = await CalculateTotalTransactions(studentInfo._id.toString(),OneTimeFees.map(e=>e._id.toString()),"onetime-fees")
    OneTimeFees.forEach(fee=>{
    let amount =  fee.classes[0]?.amount
    if(fee.feeStatus.includes("Different")) {
    amount = config.classes.find(cl=>cl.classId.toString()== studentInfo.firstClass.toString()).amount
    }
    let transactions  = totalTransactions.filter(tr=>tr.Transactions.paymentConfigId._id.toString()==fee._id.toString())
    console.log(transactions);
    let Transaction = transactions.find(tr=> tr.Transactions.paymentConfigId._id.toString()==fee._id.toString())
    let isPaid= Transactions ? true:false
    let payload = {status:"",feeTitle:fee.feeTitle,amount,session:studentInfo.firstSession ,_id:fee._id.toString(),
    feeFrequency:fee.feeFrequency,transactionId:Transaction._id}
    if(isPaid) payload.status = "Paid"
    else payload.status = "Not Paid"
    History.push(payload)
    })
    return History
    }
    return History
    }

    const CalculateFrequentDues = async(paymentConfigId,student) =>{
    let History = [] //fee frequency,feeTitle,amount,session,month,year ,Classs,

   let ClassSessionPair  = await CalculateClassSectionPair(student._id)
    let Config = await PaymentConfig.findById(paymentConfigId)
    let totalTransactions =await CalculateTotalTransactions(student._id,[Config._id])
    History = CalculateFrequentHistory(Config,totalTransactions,ClassSessionPair,student)
    return History
    
    }
    
function CalculateFrequentHistory(Config,totalTransactions,ClassSessionPair,student) {
  let History =[]
  let amount = 0
  if(Config?.feeStatus.includes("Different")) {
    amount = Config.classes.find(cl=>cl.classId.toString()== ClassSessionPair[Config.session.toString()]).amount
  }
  else amount=Config.classes[0].amount
  if(Config.feeFrequency == "Monthly"|| Config.feeFrequency == "Custom") {
    Config.paymentMonths.forEach(pay=>{
        let transaction = totalTransactions.find(tr=> tr.Transactions.month.toLowerCase()==pay.month.toLowerCase()&&tr.Transactions.year==pay.year )
        let isPaid = transaction ? true : false
        let payload = {_id:Config._id, feeTitle:Config.feeTitle, dueDate:pay.dueDate,
            amount:amount,session:Config.session,class:ClassSessionPair[Config.session.toString()],month:pay.month,year:pay.year,
        status:"" , // Not Applicable | Not Paid | Not required | Upcoming | Paid | Advanced paid
        transactionId:transaction?._id
        }
          if(pay.isPayment){
                let paymentDate = moment (pay.paymentDate)
                let DOA = moment (new Date(student.DOA).toISOString())
                if(paymentDate.isSameOrBefore(moment())  ){ 
                    if(isPaid) { payload.status="Paid"}
                    else {
                    if( paymentDate.year() ==DOA.year()) {
                        if(paymentDate.month>= DOA.month) {
                        payload.status = "Not paid"
                    }
                    else {
                        payload.status = "Not applicable"
                    }  
                  }
                    else {
                        payload.status = "Not paid"
                    }
                 }
                }
                 else {
                    if(isPaid){payload.status = "Advanced paid"}
                    else payload.status = "Upcoming"
                }
          
        }
        else { payload.status = "Not required" } 
        console.log(payload.status);
        History.push(payload)
      })    
  }
  else if(Config.feeFrequency == "Yearly") {
    let transaction =totalTransactions.some(tr=>tr.Transactions.paymentConfigId.toString()==Config._id.toString())
    let isPaid = transaction?true:false
    let payload = {_id:Config._id, feeTitle:Config.feeTitle,
        amount:amount,session:Config.session,class:ClassSessionPair[Config.session.toString()],
    status:"" , // Not Applicable | Not Paid | Not required | Upcoming | Paid | Advanced paid
    transactionId:transaction?._id
    }
    let paymentDate =moment(Config.paymentDate)
    let currentDate =moment()
    if(paymentDate.isSameOrBefore(currentDate)){
        if(isPaid) {payload.status=="Paid"}
        else {payload.status = "Not paid"}
    }
    else {
    if(isPaid){payload.status = "Advanced paid"}
    else payload.status = "Upcoming"
    }
    History.push(payload)
  }
return History
}

    async function CalculateTotalTransactions (studentId,paymentconfigs,customLookUpCollection){
      let customLookUp = customLookUpCollection || "paymentconfigs"
      return  await Transactions.aggregate([
        {
          $match: {
            "Student":new mongoose.Types.ObjectId(studentId),
            "isCancelled":false
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
            "Transactions.paymentConfigId" :{$in:paymentconfigs.map(e=>new mongoose.Types.ObjectId(e))}
          }
        }
        ,
        {
            $lookup: {
              from: customLookUp,
              localField: 'Transactions.paymentConfigId',
              foreignField: '_id',
              as: 'Transactions.paymentConfigId'
            }
          },
          {$unwind:{path:"$Transactions.paymentConfigId",preserveNullAndEmptyArrays:false}}
      ])  
    }
    
    async function CalculateClassSectionPair (studentId){
        let Classes = (await Sections_Class.find({Students:studentId}).populate({path:"Class",select:"_id"}).select("_id")).map(e=>e.Class._id)
        let Sessions = (await Session.find({Classes:{$in:Classes}}).select("_id Classes"))
        let ClassSessionPair = {}
        Sessions.forEach(ses=>{
            Classes.forEach(id=>{
                  if(ses.Classes.includes(id.toString())){
                    //session Id : Class._id
                      ClassSessionPair[ses._id.toString()] = id.toString()
                  }
            })
            }) // to allocate the key value pairs to ClassSessionPair
            return ClassSessionPair
    }

module.exports = {AnalyzePaymentHistory}