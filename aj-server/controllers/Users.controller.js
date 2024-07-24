const GlobalConfig = require("../models/GlobalConfig")
const User = require("../models/User")

const getUsers  = async(req,res)=>{
const Users = await User.find({_id:{$ne:req.AdminId},Role:{$ne:"chief admin"}}).populate({path:"StaffId",select:"acedmic_role"})
let config = await GlobalConfig.countDocuments()
if(config==0) await GlobalConfig.create({isTemporaryBlocked:false})
let isTemporaryBlocked = await GlobalConfig.findOne({})
res.status(200).json({payload:{Users,isTemporaryBlocked:isTemporaryBlocked.isTemporaryBlocked}})
}

const ToggleGlobalRestriction  = async(req,res)=>{
    let isTemporaryBlocked = (await GlobalConfig.findOne({})).isTemporaryBlocked
     await GlobalConfig.findOneAndUpdate({},{isTemporaryBlocked:!isTemporaryBlocked})
    res.status(200).json({message:isTemporaryBlocked?"Accessible by all users again.":"Temporary blocked all users."})
    }
    
const ToggleBlockIndividualUser  = async(req,res)=>{
let{userId} =req.body
try{
    let user = (await User.findById(userId))
    if(!user) return res.status(404).json({message:"User not found"})
    let isBlocked = user.isBlocked
    await User.findByIdAndUpdate(userId,{isBlocked:!isBlocked})
    res.status(200).json({message:isBlocked?"User unblocked":"User blocked"})
}
catch(err){
    console.log(err);
    res.status(501).json({message:"Somthing went wrong try again later."})
}
}
module.exports = {getUsers,ToggleGlobalRestriction,ToggleBlockIndividualUser}
