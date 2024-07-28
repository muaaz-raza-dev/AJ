const jwt= require('jsonwebtoken')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const HandleJWTToken = require('../Helpers/HandleTokenExpiry')
let JWT_Secret = process.env.jwt_Secret
 async function Authenticate (req,res,next)  {
    let token = req.header('token')
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({success:false,msg:'Try with valid credentials'})
    }
    else{
        try {
            let {decodedToken:credentials,response}=HandleJWTToken(token,res)
            if(!credentials) return response
            let verifiedMember = await User.findById(credentials.userId).select("-isBlocked -LastLogin ")
            if (!verifiedMember) {
                res.json({success:false,msg:'Try with valid credentials'})
            } 
            else{
                req.AdminId  =   verifiedMember._id
                req.details  =   verifiedMember
                next()
            }
        }
                catch(err){
                    res.status(StatusCodes.UNAUTHORIZED).json({success:false,msg:'Try with valid credentials'})
                }
    }
}

module.exports = Authenticate
