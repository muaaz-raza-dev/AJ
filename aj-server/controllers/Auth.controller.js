const jwt = require("jsonwebtoken");
const User = require("../models/User")
const bcrypt = require("bcryptjs");
const {StatusCodes:{OK}}= require("http-status-codes");
const Respond = require("../Helpers/ResponseHandler");
let secretKey =process.env.jwt_Secret
async function LoginController  (req,res){
let {usernameOrEmail, password}  =req.body
try{
    let searchedUser = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (searchedUser) {
        bcrypt.compare(password, searchedUser.password,async(err,result)=>{
            console.log(err,result);
            if (!err&&result) {
                await User.findByIdAndUpdate(searchedUser._id, { $push: { LastLogin: new Date().toISOString() } });
                let token =  jwt.sign({userId:searchedUser._id},secretKey,{expiresIn:"24 hour"})
                res.status(OK).json({success:true,message:"Logined Successfully " ,token:token , payload:searchedUser})
            }
            else{
    res.status(401)?.json({success:false, message:"Invalid password"});
            }
        })
    }
    
    else{
    res?.status(401)?.json({success:false, message:"Username or email not exists"});
    }
}
catch(err){
    res.status(500).json({success:false, message:"Internal server error"});
}

}


async function VerificationController (req,res){
    try {
        let token = req.header("auth-token")
        let decodedToken = jwt.verify(token, secretKey)
        let user = await User.findById(decodedToken.userId)
        if (user) {
            await User.findByIdAndUpdate(decodedToken.userId,{LastLogin:new Date().toISOString( )})
            res.json({ success: true, message: "Verifed", payload: user })
        }
        else {
            res.status(401).json({ success: false, message: "User verification failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function GetAccountInfo(req,res){
    Respond({res,payload:req.details})

}

async function ResetCredentials(req,res){
    let {currentPassword , newPassword , isUpdatePassword , username} = req.body 
    if(isUpdatePassword) {
        let isCorrect =await bcrypt.compare(currentPassword,req.details.password)
 if(!isCorrect){
     return res.status(401).json({success:false, message:"Incorrect current password"})
 }
 bcrypt.hash(newPassword, 8, function (err, hash) {
     if (!err) {
         User.findByIdAndUpdate(req.AdminId,{username, password: hash, });
         res.status(200).json({success:true, message:"Credential reseted successfully"})
     } else {
         res.status(501).json({success:false, message:"Something went wrong"})
     }
 });
    }
    else {
     await   User.findByIdAndUpdate(req.AdminId,{username });
        res.status(200).json({success:true, message:"Username reset successfully"})
    }
}
module.exports = {LoginController,VerificationController,GetAccountInfo,ResetCredentials}