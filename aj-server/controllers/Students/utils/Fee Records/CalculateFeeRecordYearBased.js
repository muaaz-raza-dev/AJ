const PaymentConfig = require("../../../../models/PaymentConfigs");
const Sections_Class = require("../../../../models/Sections_Class");
const Session = require("../../../../models/Session");
const Transactions = require("../../../../models/Transactions");
const moment = require("moment"); // Ensure moment is imported
const { ObjectId } = require("mongodb");
async function CalculateFeeRecordYearBased(year, feeTypes, student) {
  const payload = []; // Changed from object to array

  let ClassSessionPair = {};
  const ClassNamePair = {};
  let totalClasses = await Sections_Class.find({
    Students: student._id,
  }).populate({
    path: "Class",
    select: "_id name",
  });
  totalClasses.forEach((cl) => (ClassNamePair[cl.Class._id] = cl.Class.name));

  let totalSessions = await Session.find({
    Classes: { $in: totalClasses.map((e) => e.Class._id) },
  }).select("_id Classes");
  totalSessions.forEach((ses) => {
    totalClasses.forEach(({ Class: { _id: id } }) => {
      if (ses.Classes.some((cl) => cl.toString() == id.toString())) {
        ClassSessionPair[ses._id.toString()] = id.toString();
      }
    });
  });

  const paymentConfigs = await PaymentConfig.find({ _id: { $in: feeTypes } });
  const transactions = await getExpandedTransactions(
    student._id,
    paymentConfigs
  );

  paymentConfigs.forEach((pay) => {
    const Class = ClassNamePair[ClassSessionPair[pay.session]]; // Ensure pay.session exists
    let amount;
    if (pay.feeStatus.includes("Same")) {
      amount = pay.classes[0].amount;
    } else {
      amount = pay.classes.find(
        (cl) =>
          cl.classId.toString() == ClassSessionPair[pay.session.toString()]
      )?.amount;
    }

    if (pay.feeFrequency == "Yearly") {
      const localPayload = {
        class: Class,
        feeTitle: pay.feeTitle,
        feeFrequency: pay.feeFrequency,
        amount,
        year: moment(pay.paymentDate).year(),
      };
      let transaction = transactions.find(
        (tr) => tr.Transactions.PaymentConfigId == pay._id
      );
      const isPaid = transaction ? true : false;
      if (moment(pay.paymentDate).isAfter(moment())) {
        // after today
        if (isPaid) {
          localPayload.Invoice = transaction.Invoice; // Ensure transaction is defined
          localPayload.Time = transaction.Time; // Ensure transaction is defined
          localPayload.status = "Advanced Paid";
        } else {
          localPayload.status = "Upcoming";
        }
      } else {
        if (isPaid) {
          localPayload.Invoice = transaction.Invoice; // Ensure transaction is defined
          localPayload.Time = transaction.Time; // Ensure transaction is defined
          localPayload.status = "Paid";
        } else {
          localPayload.status = "Pending";
        }
      }
      payload.push(localPayload);
    } else {
      pay.paymentMonths.forEach((pm) => {
        if (pm.year == year) {
          let localPayload = {
            ...pm._doc,
            feeTitle: pay.feeTitle,
            feeFrequency: pay.feeFrequency,
            amount,
            class: Class,
          };
          let transaction = transactions.find(
            (tr) =>
              tr.Transactions.month.toLowerCase() == pm.month.toLowerCase() &&
              tr.Transactions.year == year
          );
          let isPaid = transaction ? true : false;
          if (pm.isPayment) {
            if (moment(pm.paymentDate).isSameOrBefore(moment())) {
              //? Before Today
              if (isPaid) {
                localPayload.status = "Paid";
                localPayload.Invoice = transaction.Invoice; // Ensure transaction is defined
                localPayload.Time = transaction.Time; // Ensure transaction is defined
              } else {
                if (
                  moment(student.DOA).isSameOrBefore(moment(pm.paymentDate))
                ) {
                  localPayload.status = "Pending";
                } else {
                  localPayload = null;
                }
              }
            } else {
              if (isPaid) {
                localPayload.status = "Advanced Paid";
                localPayload.Invoice = isPaid.Invoice; // Ensure transaction is defined
                localPayload.Time = isPaid.Time; // Ensure transaction is defined
              } else {
                localPayload.status = "Upcoming";
              }
            }
          } else {
            localPayload.status = "No Fees";
          }
          if (localPayload) payload.push(localPayload);
        }
      });
    }
  });
  return payload;
}

async function getExpandedTransactions(studentId, paymentConfigs) {
  return await Transactions.aggregate([
    {
      $match: {
        Student: new ObjectId(studentId),
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
        "Transactions.paymentConfigId": {
          $in: paymentConfigs.map((e) => e._id),
        },
      },
    },
  ]);
}

module.exports = { CalculateFeeRecordYearBased, getExpandedTransactions };
