
async function ValidateOwnerShipStd(req,res,next){
if(req.params.id==req.details.Student.toString()) return next()
else return res.status(401).json({success:false,message:"Invalid Credentials"})
}
module.exports = {ValidateOwnerShipStd}