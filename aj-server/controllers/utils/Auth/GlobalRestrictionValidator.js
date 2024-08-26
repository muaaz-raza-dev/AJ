const { redis } = require("../../../db");
const GlobalConfig = require("../../../models/GlobalConfig");

const GlobalRestrictionValidator = async () => {
  let globalConfig = await redis?.get("globalConfig")
  let isTemporaryBlocked = false;
  if(!globalConfig){
    globalConfig = await GlobalConfig.findOne();
    await redis.set("globalConfig",JSON.stringify(globalConfig),"EX",60*10) //10 minutes
  }
  if (!globalConfig) globalConfig = await GlobalConfig.create({ isTemporaryBlocked: false });
  else {
    isTemporaryBlocked = globalConfig.isTemporaryBlocked;
  }
  return isTemporaryBlocked;
};

const StdRestrictionValidator = async () => {
  let isTemporaryBlocked = false;
  let globalConfig = await GlobalConfig.findOne();
  if (!globalConfig) {
    await GlobalConfig.create({ isStdBlocked: false });
    return false;
  } else {
    isTemporaryBlocked = globalConfig.isStdBlocked;
  }
  return isTemporaryBlocked;
};
const UserSpecificRestrictionValidator = (user) => {
  if (!user.Role || user.Role != "chief admin") {
    if (user?.isBlocked) return true;
    else return false;
  }
  return false;
};
const isLogOutRequired = (user) => {
  if (user?.isLogOutRequired) return true;
  else false;
};
module.exports = {
  GlobalRestrictionValidator,
  UserSpecificRestrictionValidator,
  isLogOutRequired,
  StdRestrictionValidator,
};
