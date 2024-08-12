const OneTimeFee = require("../../../models/OneTimeFee");
const PaymentConfig = require("../../../models/PaymentConfigs")

const SetupPaymentConfigAuto = async (SessionId, ClassId) => {
    const models = [PaymentConfig, OneTimeFee];

    for (const Model of models) {
      const docs = await Model.find({isDeprecated:false, session: SessionId, feeStatus: "Same amount for every Class" });
  
      for (const doc of docs) {
        const lastAmount = doc.classes.length > 0 ? doc.classes[doc.classes.length - 1].amount : 0;
        
        await Model.findByIdAndUpdate(
          doc._id ,
          {
            $push: {
              classes: {
                  classId: ClassId,
                  amount: lastAmount
              }
            }
          }
    )
      }
    }

  
}

const SetupPaymentConfigCustom = async (SessionId, ClassId, Amount) => {
  await PaymentConfig.updateMany(
    { session: SessionId, feeStatus: "Different amount for every Class" },
    {
      $push: {
        classes: {
          $each: [{
            classId: ClassId,
            amount: Amount
          }],
          $position: 0
        }
      }
    }
  );

  // This function updates all PaymentConfig documents that match the following criteria:
  // 1. The 'session' field matches the provided SessionId
  // 2. The 'feeStatus' field is "Different amount for every Class"
  
  // For each matching document, it performs the following operation:
  // 1. Pushes a new object to the 'classes' array
  // 2. The new
}

module.exports= SetupPaymentConfigAuto