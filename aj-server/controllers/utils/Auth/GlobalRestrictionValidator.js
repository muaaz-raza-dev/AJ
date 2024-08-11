const GlobalConfig = require("../../../models/GlobalConfig")

const GlobalRestrictionValidator = async(user) => {
    if(user.Role !="chief admin"){
        let  globalConfig = await GlobalConfig.findOne()
        let isTemporaryBlocked = false
        if(!globalConfig) await GlobalConfig.create({isTemporaryBlocked:false})
            else {isTemporaryBlocked =  globalConfig.isTemporaryBlocked}
        if(isTemporaryBlocked) return true
        return isTemporaryBlocked
    }
    return false
}

const UserSpecificRestrictionValidator = (user) => {
if(user.Role !="chief admin"){
    if(user?.isBlocked) return true
    else return false 
}
return false
}
const isLogOutRequired = (user)=>{
if(user?.isLogOutRequired) return true
else false
}
module.exports = {GlobalRestrictionValidator,UserSpecificRestrictionValidator,isLogOutRequired}