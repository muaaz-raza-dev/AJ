const bcryptjs = require("bcryptjs");
const Respond = require("../Helpers/ResponseHandler");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

const CreateMemberAccount= async (Credentials,Teacher_Id)=> { 
    let {username,password,role} =Credentials
    bcryptjs.hash(password, 8, function(err, hash) {
        if(!err) { User.create({username,password:hash,role ,Teacher_Id}) 
        return true
        }
        else false
    });
}
const RegsiterMember = async (req,res)=> {
const {payload} =req.body
if (payload?.firstName) {
    let Credentials = payload.account_Details
    let Payload = payload
    delete Payload.account_Details
    console.log(Payload);
    Teacher.create(Payload).then(async data=>{
        let Response = await CreateMemberAccount(Credentials,data._id)
        if(Response) Respond({res,message:"The new member is successfully registered!",success:true,payload:data})
        else Respond({res,message:"Something went wrong , try again!",success:false,payload:data})

    })
}
}

const ValidateUserName = async (req,res)=> {
    let {username} = req.params
    let user = await User.findOne({username})
    if(user){
        Respond({res, message:"username available" ,success:true })
}
    else {
        Respond({res,error:"Already exits" , message:"username is taken" ,success:false,status:501})
    }
    }

module.exports = {RegsiterMember,ValidateUserName}