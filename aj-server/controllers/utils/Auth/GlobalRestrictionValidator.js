const GlobalConfig = require("../../../models/GlobalConfig")

const GlobalRestrictionValidator = async() => {
    let  globalConfig = await GlobalConfig.findOne()
    let isTemporaryBlocked = false
    if(!globalConfig) await GlobalConfig.create({isTemporaryBlocked:false})
    else {isTemporaryBlocked =  globalConfig.isTemporaryBlocked}
    if(isTemporaryBlocked) return true
    return isTemporaryBlocked
}

const UserSpecificRestrictionValidator = (user) => {
    if(user?.isBlocked) return true
    else return false
}
const isLogOutRequired = (user)=>{
if(user?.isLogOutRequired) return true
else false
}
module.exports = {GlobalRestrictionValidator,UserSpecificRestrictionValidator,isLogOutRequired}