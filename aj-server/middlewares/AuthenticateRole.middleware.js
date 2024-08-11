 const AuthenticateRole =(Role)=> function (req,res,next)  {
    if (req.details.Role == Role) {
        next()
    }
    else {
        return res.status(403).json({ success: false, message: "You are not eligible to access this route." });
    }
}





module.exports = {AuthenticateRole}
