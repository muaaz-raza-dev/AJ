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

const ReadSessions = async(req,res)=>{
const Sessions =await Session.find().populate("Classes").select("-createdBy ")
Respond({res,success:true,message:"Sessions fetched",status:200,payload:Sessions})
}

module.exports = {RegisterSession,ReadSessions};