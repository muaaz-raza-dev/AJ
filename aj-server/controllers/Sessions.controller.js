const Respond = require("../Helpers/ResponseHandler");
const Session = require("../models/Session");

const RegisterSession = async(req,res)=>{
    const {payload} =req.body
    try {
        await Session.updateMany({isActive:false}) // to deactivate before creation of new one
        let Sessions = await Session.create({...payload,createdBy:req.AdminId})
        Respond({res,payload:Sessions,success:true,message:"Session registerd successfully!"})
    } catch (err) {
        console.log(err);
        Respond({res,success:false,message:"An error occured . try again .", status:501 ,error:err})
    }
}

const UpdateSession = async(req,res)=>{
    const {payload,id} =req.body
    try {
        let Sessions = await Session.findByIdAndUpdate(id,{...payload,createdBy:req.AdminId})
        Respond({res,payload:Sessions,success:true,message:"Session Updated successfully!"})
    } catch (err) {
        Respond({res,success:false,message:"An error occured . try again .", status:501 ,error:err})
    }
}


const ReadSessions = async(req,res)=>{
const Sessions =await Session.find()
Respond({res,success:true,message:"Sessions fetched",status:200,payload:Sessions})
}


const ReadSession = async(req,res)=>{
let {id} =req.params
try{
    if(id.length!=24) return Respond({res,status:404,message:"Invlalid Session Id"})
        let session = await Session.findById(id).select("session_name acedmic_year end_date start_date session_description")
    if(!session) return Respond({status:404,message:"Invlalid session Id"})
      return  Respond({res,payload:session})
}
catch(err){
    return Respond({res,status:404,message:"Somthing went wrong.  Try again later"})
}
}
module.exports = {RegisterSession,ReadSessions,ReadSession,UpdateSession};