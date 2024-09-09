const { ExtractIpAddress } = require("../../../../utils/getLocationFromIp");
const Account = require("../../../../models/StdAcconts");
const GlobalConfig = require("../../../../models/GlobalConfig");

const StdGlobalRestrictionValidator = async (res) => {
  let isRestricted = false;
  let response = false
  let globalConfig = await GlobalConfig.findOne();
  if (!globalConfig) {
    globalConfig = await GlobalConfig.create({ isStdBlocked: false });
  } 
  else {
    if(globalConfig.isStdBlocked){
      response = res.status(403).json({success: false,message: "Access denied , Contact your admin .",});
      isRestricted = true;
   }
  }
  
  return {isRestricted,response};
};


const StdIpValidator = async (req,res) => {
  let isRestricted = false;
  let response = false
  const ip = ExtractIpAddress(req)

  const isLoginInfo = req.details?.logins?.find(l=>l.ip==ip)??null;
    if(!isLoginInfo){
      await Account.findByIdAndUpdate(req.details._id, { $pull: { logins: { ip: ip } } });
      response = res.status(403).json({success: false,message: "Re-login is required ,Try with valid credentials .",});
      isRestricted = true;
    }
  
  return {isRestricted,response};
};


module.exports = {StdIpValidator,StdGlobalRestrictionValidator}