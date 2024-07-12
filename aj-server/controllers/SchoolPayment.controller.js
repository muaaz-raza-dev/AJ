const Respond = require("../Helpers/ResponseHandler");
const PaymentConfig = require("../models/SchoolPayments");
const Session = require("../models/Session");
const { OptimizeDates } = require("./utils/OptimizeSessionDates_SchoolPayment");
const RegisterPayment = async(req,res)=>{
    let {payload} = req.body;
    let isExist = await PaymentConfig.findOne(payload)
    if(isExist) {
        Respond({
            res,
            message: 'Already exists',
            success:false
        })
    } else {
    let feeScope = payload.session ? "Session-based" : "Global";
    let payment = await PaymentConfig.create({...payload,feeScope})
        Respond({res,
            message: 'Payment Registered successfully',
            payload:payment
        })
    }
}


const GetSessions = async(req,res)=>{
    let sessions = await Session.find().populate("Classes").select("-createdBy ").sort("isActive")
    let Payload =JSON.parse(JSON.stringify(sessions))
    let Sessions = []
    let Classes = {}
    let paymentMonths = {}
   Payload.forEach(e=>{
        Sessions.push({label:e.session_name+" " +e.acedmic_year,value:e._id , start_date:e.start_date , end_date:e.end_date})
        Classes[e._id] = []
        let dates = OptimizeDates(e.start_date,e.end_date)
        paymentMonths[e._id] =   dates
        e.Classes.forEach(val=>{
        Classes[e._id].push({label:val.name,value:val._id})
        })
    })
    Respond({res,
        message: 'Fetched sessions and classes',
        payload:{Sessions,Classes,paymentMonths}
    })

}

const GetConfigs =  async(req,res)=>{
let { session , feeScope} = req.body
let query = {session,feeScope}
if(!session) {delete query.session}
let Configs = await PaymentConfig.find(query).populate({path:"session",select:"session_name acedmic_year"})
.populate({path:"classes",populate:{path:"classId",select:"name"}})
let payload = JSON.parse(JSON.stringify(Configs))
payload.forEach((config,i)=>{
    payload[i].classes = config?.classes.map(e=>({amount:e.amount,name:e.classId?.name}))
    payload[i].session = config.session.session_name + " " +config.session.acedmic_year
    let times =  config ?.paymentMonths.filter(pay=>pay.isPayment).length
    payload[i].Installments = `${times} times in a Session`
})
console.log(payload);
Respond({res,payload:payload})
}

const FetchConfigDetails = async(req,res)=>{
let {id} =req.params
let Config  =await PaymentConfig.findById(id).populate({path:"classes.classId",select:"name _id"})
let payload = JSON.parse(JSON.stringify(Config))
payload.classes = payload.classes.map(e=>({classId:e.classId._id,label:e.classId.name,value:e.classId._id,amount:e.amount})) 
Respond({res,payload})   
}

const UpdateConfig = async(req,res)=>{ 
    let {id, payload} = req.body
    let config = await PaymentConfig.findByIdAndUpdate(id,{isDeprecated:true,deprecatedDate:new Date().toISOString()},{new:true})
    delete payload._id
    let feeScope = payload?.session ? "Session-based" : "Global";
    let new_config = await PaymentConfig.create({...payload,feeScope})
    Respond({res,payload:config,message:"Config Updated",payload:new_config})
}
module.exports = {RegisterPayment,GetSessions,GetConfigs,FetchConfigDetails,UpdateConfig}