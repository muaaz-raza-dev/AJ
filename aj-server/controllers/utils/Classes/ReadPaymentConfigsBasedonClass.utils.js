const OneTimeFee = require("../../../models/OneTimeFee")
const PaymentConfig = require("../../../models/SchoolPayments")

const ReadPaymentConfigsBasedonClass = async (SessionId, classId) => {
    let Payload = [];
    let isPaymentConfigUpdate =false
    let Configs = [PaymentConfig, OneTimeFee];

    for (const config of Configs) {
        let payloads = await config.find({session: SessionId, isDeprecated: false}).select("classes feeTitle feeStatus");
        // Ensure each payload is handled correctly
        payloads.forEach(payload => {
            if (payload._doc) {
                Payload.push(payload._doc);
            } else {
                Payload.push(payload);
            }
        });
    }

    // Map over Payload to adjust 'classes' field
    Payload = Payload.map(config => 
    {
        let Class = config.classes.find(cl => cl.classId.toString() === classId) || null
        if(!Class) isPaymentConfigUpdate = true
        config.class = Class
        delete config.classes;
        return config
    }
    );

    return {Payload,isPaymentConfigUpdate};
}

module.exports = ReadPaymentConfigsBasedonClass;
