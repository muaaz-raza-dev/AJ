const jwt = require("jsonwebtoken");

let secretKey =process.env.jwt_Secret
const HandleJWTToken = (token,res,secret=secretKey)=>{
    let response = null
    let decodedToken ;
    try {
         decodedToken = jwt.verify(token, secret)
        if(!decodedToken) { 
            response = res.status(403).json({success:false, message:"Session Expired. Re-login into your account."}) 
            decodedToken = null
        }
        } catch (err) {
    if (err.name === 'TokenExpiredError') {
        response = res.status(403).json({success:false, message:"Session Expired. Re-login into your account."}) 
    } else {
        response= res.status(500).json({success:false, message:"Internal server error"})
    }
    decodedToken = null
    }
    return {decodedToken,response}
}
module.exports = HandleJWTToken