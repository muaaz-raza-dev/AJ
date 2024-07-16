const PaymentConfig = require("../../../models/SchoolPayments")
const Session = require("../../../models/Session")
const lod = require("lodash")
 const CalculatePaymentConfigs = async() =>{
    let paymentConfigs = [{value:"Custom",label:"Custom"},]
    let currentSession = await Session.findOne({isActive:true}).select("_id")
    let paymentsSessionBased = await PaymentConfig.find({isDeprecated:false,session:currentSession._id,feeScope:"Session-based"}).select("feeTitle")
    let paymentsGlobal = await PaymentConfig.find({isDeprecated:false,feeScope:"Global"}).select("feeTitle")
    let payload = [...paymentsSessionBased,...paymentsGlobal].map(e=>({label:e.feeTitle,value:e._id}))
    paymentConfigs.push(...payload)
    return paymentConfigs
}
module.exports = {CalculatePaymentConfigs}