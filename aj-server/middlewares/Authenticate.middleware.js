const jwt= require('jsonwebtoken')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
let JWT_Secret = process.env.jwt_Secret
 async function Authenticate (req,res,next)  {
    let member = req.header('token')
    if (!member) {
        res.status(StatusCodes.UNAUTHORIZED).json({success:false,msg:'Try with valid credentials'})
    }
    else{
     let credentials =jwt.verify(member, JWT_Secret)
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
}

module.exports = Authenticate
