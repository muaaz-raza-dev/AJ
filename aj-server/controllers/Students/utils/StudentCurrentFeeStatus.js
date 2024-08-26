const PaymentConfig = require("../../../models/PaymentConfigs");
const Transactions = require("../../../models/Transactions");
const moment = require("moment")
const CalculateCurrentFeeStatus = async (student) => {
  const payload = {};
  const paymentConfigs = await PaymentConfig.find({
    "classes.classId": student.CurrentClass,
  }).sort({ Time: -1 })
  const transactions = await Transactions.aggregate([
    {
      $match: {
        Student: student._id,
      },
    },
    {
      $unwind: {
        path: "$Transactions",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        "Transactions.paymentConfigId":{$in:paymentConfigs.map(e=>e._id)}
      },
    },
  ]);
  const currentMonth = moment().month();
  paymentConfigs.forEach((pay) => {
    let amount;
    if (pay.feeStatus.includes("Same")) {
      amount = pay.classes[0].amount;
    } else {
      amount =
        pay.classes.find((cl) => cl.classId.toString() == student.CurrentClass)
          ?.amount || 0;
    }
    if (pay.feeFrequency == "Monthly" || pay.feeFrequency == "Custom") {
      pay.paymentMonths.forEach((pm) => {
        if (currentMonth == moment(pm.paymentDate).month()) {
          payload[pay._id] = {
            paymentDate: pm.paymentDate,
            dueDate: pm.dueDate,
            month: pm.month,
            year: pm.year,
            amount,
            feeTitle :pay.feeTitle
          };
          let isPaid = transactions.find(
            (tr) =>
              tr.Transactions.paymentConfigId._id.toString() ==
                pay._id.toString() &&
              tr.Transactions.month == pay.month &&
              tr.Transactions.year == pay.year
          );
          if (!pm.isPayment) {
            payload[pay._id].status = "No Fees";
          } else {
            if (!isPaid) {
              payload[pay._id].status = "Due";
            } else {
                payload[pay._id].Invoice = isPaid.Invoice;
            payload[pay._id].Time = isPaid.Time;

              payload[pay._id].status = "Paid";
            }
          }
        }
      });
    } else {
      if (moment(pay.paymentDate).month() == currentMonth) {
        payload[pay._id] = {
          paymentDate: pay.paymentDate,
          dueDate: pay.dueDate,
          year:moment(pay.paymentDate).year(),
          amount,
        };
        let isPaid = transactions.find(
          (tr) =>
            tr.Transactions.paymentConfigId._id.toString() == pay._id.toString()
        );
        if (pay.isPayment) {
          payload[pay._id].status = "No Fees";
        } else {
          if (!isPaid) {
            payload[pay._id].status = "Due";
          } else {
            payload[pay._id].Invoice = isPaid.Invoice;
            payload[pay._id].Time = isPaid.Time;
            payload[pay._id].status = "Paid";
          }
        }
      }
    }
  });
  return  Object.values(payload);
};
module.exports = { CalculateCurrentFeeStatus };
