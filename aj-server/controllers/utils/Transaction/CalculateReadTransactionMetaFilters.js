const OneTimeFee = require("../../../models/OneTimeFee")
const PaymentConfig = require("../../../models/SchoolPayments")
const Session = require("../../../models/Session")
 const CalculatePaymentConfigs = async() =>{
    let paymentConfigs = [{value:"Custom",label:"Custom"},]
    return paymentConfigs
}
module.exports = {CalculatePaymentConfigs}