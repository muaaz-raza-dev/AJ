const Respond = require("../Helpers/ResponseHandler");
const OneTimeFee = require("../models/OneTimeFee");
const PaymentConfig = require("../models/PaymentConfigs");
const Session = require("../models/Session");
const { OptimizeDates } = require("./utils/OptimizeSessionDates_SchoolPayment");
const PaymentConfigSpecificStat = require("./utils/Payments/PaymentConfigSpecificStat");
const RegisterPayment = async(req,res)=>{
    let {payload} = req.body;
    try{
        if(payload.feeFrequency == "One Time") {
            delete payload.feeFrequency
            let OneTime = await RegisterOneTimeConfig(payload)
            if(!OneTime)  Respond({res,message: 'Somethig went wrong.',status:500,success:false}) 
        }
        else {
            if(payload.feeFrequency=="Yearly")
            delete payload.paymentMonths
            await PaymentConfig.create({...payload})
        }
        
        Respond({res,
            message: 'Payment Registered successfully',
        })
    }
    catch(err){
        console.log(err);
        Respond({res,
            message: 'Somethig went wrong.',
            status:500,
            success:false
        })  
    }
}
const RegisterOneTimeConfig = async(payload)=>{
    try{

        let ParentPayload = JSON.parse(JSON.stringify(payload))
        delete ParentPayload.classes
        delete ParentPayload.session
let parent = await OneTimeFee.create({...ParentPayload,isParent:true})
let childPayload = {...payload, Parent: parent._id || parent._doc._id}
let child = await OneTimeFee.create(childPayload)
await OneTimeFee.findByIdAndUpdate(parent._id,{$push:{Children:child._id||child._doc._id}})
return child
}
catch(err){
    return false  //! false == error
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
let { session , feeTypes} = req.body
let query = {session,isDeprecated:false}
let Configs = [] ;
if(feeTypes=="Other"){
    Configs = await PaymentConfig.find(query).populate({path:"session",select:"session_name acedmic_year"})
    .populate({path:"classes",populate:{path:"classId",select:"name"}})
}
else {
    Configs = await OneTimeFee.find({session,isDeprecated:false}).populate({path:"session",select:"session_name acedmic_year"})
    .populate({path:"classes",populate:{path:"classId",select:"name"}}).select("-paymentMonths")
}
let payload = JSON.parse(JSON.stringify(Configs))
payload.forEach((config,i)=>{
    payload[i].classes = config?.classes.map(e=>({amount:e.amount,name:e.classId?.name}))
    payload[i].session = config.session.session_name + " " +config.session.acedmic_year

    let times = config.feeFrequency == "Yearly" ? 1 : config?.paymentMonths?.filter(pay=>pay.isPayment).length 

    payload[i].Installments = feeTypes =="One Time" ? "One time in the admission" : `${times} times in a Session`
})
Respond({res,payload})
}

const FetchConfigDetails = async(req,res)=>{
let {id} =req.params
if(!id||id.length!=24) return res.status(404).json({message:"Invalid Id"})
let Config  =await PaymentConfig.findById(id).populate({path:"classes.classId",select:"name _id"})
 if(!Config) return res.status(404).json({message:"Config Not Found"})  // Check if Config exists
let payload = JSON.parse(JSON.stringify(Config))
payload.classes = payload.classes.map(e=>({classId:e.classId._id,label:e.classId.name,value:e.classId._id,amount:e.amount})) 
Respond({res,payload})   
}

const UpdateConfig = async(req,res)=>{ 
    let {id, payload} = req.body
    delete payload._id
    let config = await PaymentConfig.findByIdAndUpdate(id,{...payload,isDeprecated:false},{new:true})
    Respond({res,payload:config,message:"Config Updated",payload:config})

}


const FetchConfigAllDetails = async(req,res)=>{
const {id} =req.params
if(!id||id.length!=24) return res.status(404).json({message:"Invalid Id"})
let Config = null
Config = await PaymentConfig.findById(id).populate({path:"session",select:"session_name acedmic_year"}).populate({path:"classes.classId",select:"name _id sections",populate:{path:"sections",select:"Students"}})
if(!Config){ 
Config = await OneTimeFee.findById(id).populate({path:"session",select:"session_name acedmic_year"}).populate({path:"classes.classId",select:"name _id sections" ,populate:{path:"sections",select:"Students"}})
if(!Config)return res.status(404).json({message:"Config Not Found"})  // Check if Config exists
}

let stats = await PaymentConfigSpecificStat(Config)
res.json({success:true,payload:Config,stats})

}


module.exports = {RegisterPayment,GetSessions,GetConfigs,FetchConfigDetails,UpdateConfig,FetchConfigAllDetails}
