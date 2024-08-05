const OneTimeFee = require("../../../models/OneTimeFee")
const PaymentConfig = require("../../../models/SchoolPayments")

const PaymentConfigClassValidator =async (Classes,sessionId,payload) => {
let PaymentConfigs  = await PaymentConfig.countDocuments({session:sessionId})
let OneTimeConfigs  = await OneTimeFee.countDocuments({session:sessionId})
let SessionConfigs = PaymentConfigs+OneTimeConfigs
async function PaymentUpdateValidator(ClassId) {
  let totalConfigsClass = await PaymentConfig.countDocuments({
    'classes.classId': ClassId
  });
  let totalOneTimeConfigClass = await OneTimeFee.countDocuments({
    'classes.classId': ClassId
  });
  let Total = totalConfigsClass + totalOneTimeConfigClass;
  if (Total < SessionConfigs) return true;
  else return false;

}


for (let i = 0; i < Classes.length; i++) {
let result = await PaymentUpdateValidator(Classes[i]._id)
payload[i].updates = {paymentConfigs:result}
}


return payload



}

module.exports  = PaymentConfigClassValidator
