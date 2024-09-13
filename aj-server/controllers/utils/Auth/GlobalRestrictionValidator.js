const GlobalConfig = require("../../../models/GlobalConfig");

const cookieKey = process.env.STD_COOKIE_KEY;

const GlobalRestrictionValidator = async (res) => {
  let isTemporaryBlocked = false;
  let response = null;
  let globalConfig = await GlobalConfig.findOne();
  if (!globalConfig) globalConfig = await GlobalConfig.create({ isTemporaryBlocked: false });
  else {
     isTemporaryBlocked = globalConfig.isTemporaryBlocked;
     if(globalConfig.isTemporaryBlocked) {
      isRestricted = true;
      response = res.status(403).clearCookie(cookieKey, {
        secure: process.env.NODE_ENV === "production",
        domain: ".ajfoundation.site",
        path: "/",
      }).json({success: false,message: "Access denied , Contact your admin .",});
      
     }
  }

  return {isRestricted:isTemporaryBlocked,response};
};




const UserSpecificRestrictionValidator = (user,res) => {
  let isRestricted = false
  let response = null
  if (!user.Role || user.Role != "chief admin") {
    if (user?.isBlocked){
      response =  res.status(403).clearCookie(cookieKey, {
        secure: process.env.NODE_ENV === "production",
        domain: ".ajfoundation.site",
        path: "/",
      }).json({success: false,message: "Access denied , Contact your admin .",});
     
      isRestricted = true
    } 
  }
  return {isRestricted,response};
};

const isLogOutRequired = (user,res) => {
  let isRestricted = false
  let response = null
  if (user?.isLogOutRequired){ isRestricted= true
    response = res.status(403).clearCookie(cookieKey, {
      secure: process.env.NODE_ENV === "production",
      domain: ".ajfoundation.site",
      path: "/",
    }).json({ success: false, message: "Re-login required, login with your credentials again." });
  };
  return {isRestricted,response};
};

module.exports = {
  GlobalRestrictionValidator,
  isLogOutRequired,
  UserSpecificRestrictionValidator
};
