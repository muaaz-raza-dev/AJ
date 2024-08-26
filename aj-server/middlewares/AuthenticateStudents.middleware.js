const StdAccounts = require('../models/StdAcconts')
const { StatusCodes } = require('http-status-codes')
const HandleJWTToken = require('../Helpers/HandleTokenExpiry')
 async function AuthenticateStudents (req,res,next)  {
    let token = req.header('token')
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({success:false,msg:'Try with valid credentials'})
    }
    else{
        try {
            let {decodedToken:credentials,response}=HandleJWTToken(token,res)
            if(!credentials) return response
            let verifiedMember = await StdAccounts.findById(credentials.userId).select("-isBlocked -LastLogin ")
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

module.exports = AuthenticateStudents
