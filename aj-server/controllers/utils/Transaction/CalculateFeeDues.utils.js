const moment = require("moment");
const PaymentConfig = require("../../../models/PaymentConfigs");
const Sections_Class = require("../../../models/Sections_Class");
const Session = require("../../../models/Session");
const Transactions = require("../../../models/Transactions");
const OneTimeFee = require("../../../models/OneTimeFee");
const { default: mongoose } = require("mongoose");
const CalculateFeeDues = async (studentInfo) => {
let FrequentDues  = await CalculateFrequentDues(studentInfo)  
let OneTimeDues = await CalculateOneTimeDues(studentInfo)
let Dues = FrequentDues.concat(OneTimeDues||[])
let FeeInfo = await AnalyzeFeeInfo(Dues,studentInfo)
return {Dues,FeeInfo}
};

const CalculateOneTimeDues = async(studentInfo)=>{
let Dues = []
if(studentInfo.ConsiderOneTimeFee){
let OneTimeFees = await OneTimeFee.find({session:studentInfo.firstSession})
let totalTransactions = await CalculateTotalTransactions(studentInfo._id.toString(),OneTimeFees.map(e=>e._id.toString()),"onetime-fees")
OneTimeFees.forEach(fee=>{
let amount = 0
if(fee.feeStatus.includes("Different")) {
amount = config.classes.find(cl=>cl.classId.toString()== studentInfo.firstClass.toString()).amount
}
else { amount = fee.classes[0].amount}
let transactions  = totalTransactions.filter(tr=>tr.Transactions.paymentConfigId._id.toString()==fee._id.toString())
let feeDue = {feeTitle:fee.feeTitle,amount,session:studentInfo.firstSession ,_id:fee._id.toString(),feeFrequency:fee.feeFrequency}
let isPaid = transactions.some(tr=> tr.Transactions.paymentConfigId._id.toString()==fee._id.toString())
if(!isPaid) Dues.push(feeDue)
})
return Dues
}
}

const CalculateFrequentDues = async(studentInfo) =>{
let Dues = [] //fee frequency,feeTitle,amount,session,month,year ,Classs,
let Classes = (await Sections_Class.find({Students:studentInfo}).populate({path:"Class",select:"_id"}).select("_id")).map(e=>e.Class._id)
let Sessions = (await Session.find({Classes:{$in:Classes}}).select("_id Classes"))
let SessionPaymentConfigs = await PaymentConfig.find({isDeprecated:false, session:{$in:Sessions.map(e=>e._id)}})
let ClassSessionPair ={}
Sessions.forEach(ses=>{
Classes.forEach(id=>{
      if(ses.Classes.includes(id.toString())){
        //session Id : Class._id
          ClassSessionPair[ses._id.toString()] = id.toString()
      }
})
}) // to allocate the key value pairs to ClassSessionPair
let totalTransactions =await CalculateTotalTransactions(studentInfo._id,SessionPaymentConfigs.map(e=>e._id))
SessionPaymentConfigs.forEach(config=>{
  let amount = 0
  if(config?.feeStatus.includes("Different")) {
    amount = config.classes.find(cl=>cl.classId.toString()== ClassSessionPair[config.session.toString()]).amount

  }
  else amount=config.classes[0].amount
  let transactions  = totalTransactions?.filter(tr=>tr.Transactions.paymentConfigId._id.toString()==config._id.toString()) ||[]
  if(config.feeFrequency == "Monthly"|| config.feeFrequency == "Custom") {
    config.paymentMonths.forEach(pay=>{
        let isPaid = transactions.some(tr=>tr.Transactions.month==pay.month&&tr.Transactions.year==pay.year)
          if(pay.isPayment&&!isPaid){
            let paymentDate = moment (pay.paymentDate)
            let DOA = moment (new Date(studentInfo.DOA).toISOString())
            if(paymentDate.isSameOrBefore(moment())  ){ 
              if(DOA.isSameOrBefore(paymentDate)){
                Dues.push({_id:config._id, feeTitle:config.feeTitle, dueDate:pay.dueDate,feeFrequency:config.feeFrequency,
                  amount:amount,session:config.session,class:ClassSessionPair[config.session.toString()],month:pay.month,year:pay.year})
              }
           
              }
          }
      })    
  }
  else if(config.feeFrequency == "Yearly") {
    let isPaid =transactions.some(tr=>tr.Transactions.paymentConfigId._id.toString()==config._id.toString())
    let paymentDate =moment(config.paymentDate)
    let currentDate =moment()
    if(!isPaid&&paymentDate.isSameOrBefore(currentDate)){
      Dues.push({feeTitle:config.feeTitle,feeFrequency:config.feeFrequency, amount,session:config.session,class:ClassSessionPair[config.session.toString()],_id:config._id ,paymentDate:config?.paymentDate })
    }
  }

})
return Dues

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


async function AnalyzeFeeInfo(Dues,studentInfo){
  let dues = [...Dues]
  let Sessions = {} ;
  (await Session.find()).forEach(doc=>(Sessions[doc._id.toString()]=`${doc.acedmic_year}`)) ;
  let CurrentSession = await Session.findOne({isActive:true}).select("_id") ;
 (await PaymentConfig.find({isDeprecated:false,session:CurrentSession._id})).map(config=>{
    if(config.feeFrequency=="Monthly"|| config.feeFrequency=="Custom"){
      let amount = 0;
      let Class = null
      let classInfo = config.classes.find(cl=>cl.classId.toString()== studentInfo.CurrentClass.toString())
      if(config?.feeStatus.includes("Different")) {
        amount = classInfo.amount;
         Class = classInfo.classId.toString() 
      }
      else amount=config.classes[0].amount
      config.paymentMonths.map(pay=>{
        if((+pay.year == +moment().year() && moment(pay.month,"MMMM").month() > moment().month())||+pay.year > +moment().year()  ) {
          dues.push({_id:config._id, feeTitle:config.feeTitle, dueDate:pay.dueDate,feeFrequency:config.feeFrequency,
            amount:amount,session:config.session,class:Class,month:pay.month,year:pay.year})
        }
        })
    }
  }) //to get the futute details

  let FeeInfo = {Purposes:[],Dates:{},Sessions:{},Amounts:{}} // Purposes : {feeFrequecy,label:feeTilte,value:_id} , Dates : {} ,Sessions:{label:sessionName ,value:_id} , Amount:{}
  let IdConfig ={}
  dues.forEach(due=>{
    let id = due?._id  //! id is combined to reduce the risk of amount
    if(!id) return FeeInfo
    if(!FeeInfo.Amounts[id]) FeeInfo.Amounts[id] = due.amount
    if(!IdConfig[id]){
       IdConfig[id] ={id}
       FeeInfo.Purposes.push({feeFrequency:due.feeFrequency,label:due.feeTitle+" "+ Sessions[due.session],value:id,feeTitle:due.feeTitle,session_name:Sessions[due.session],sessionId:due.session})
      }
    if(!FeeInfo.Sessions[id])FeeInfo.Sessions[id]=[]
    FeeInfo.Sessions[id].push({value: due.session ,label:Sessions[due.session]})
  if(due.feeFrequency=="Monthly"||due.feeFrequency=="Custom"){
    if(!FeeInfo.Dates[id]) FeeInfo.Dates[id] ={}
    if(!FeeInfo.Dates[id][due.year]) FeeInfo.Dates[id][due.year] = []
    FeeInfo.Dates[id][due.year].push(due.month)
  }
  })
  return FeeInfo
}
module.exports = { CalculateFeeDues ,CalculateOneTimeDues,CalculateFrequentDues};
