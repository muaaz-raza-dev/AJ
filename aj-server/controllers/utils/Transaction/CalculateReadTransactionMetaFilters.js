const OneTimeFee = require("../../../models/OneTimeFee")
const PaymentConfig = require("../../../models/SchoolPayments")
const Session = require("../../../models/Session")
const lod = require("lodash")
 const CalculatePaymentConfigs = async() =>{
    let paymentConfigs = [{value:"Custom",label:"Custom"},]
    let currentSession = await Session.findOne({isActive:true}).select("_id")
    let paymentsSessionBased = await PaymentConfig.find({isDeprecated:false,session:currentSession._id,}).select("feeTitle")
    let OneTimePayment = await OneTimeFee.find({isDeprecated:false,session:currentSession._id}).select("feeTitle")
    let payload = [...paymentsSessionBased,...OneTimePayment].map(e=>({label:e.feeTitle,value:e._id}))
    paymentConfigs.push(...payload)
    return paymentConfigs
}
module.exports = {CalculatePaymentConfigs}