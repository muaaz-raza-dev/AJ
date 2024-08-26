const PaymentConfig = require("../../../models/PaymentConfigs");
const Sections_Class = require("../../../models/Sections_Class");
const Session = require("../../../models/Session");
const Students = require("../../../models/Students");
const Transactions = require("../../../models/Transactions");
const {ObjectId} = require("mongodb")
const moment = require("moment")
async function GetDuesShallowDetailsFn(studentId) {
  const payload = { Dues: 0, PendingFee: 0 }; // Dues total Amount , PendingFee : Number of pending fee
  let ClassSessionPair = {};
  let Student = await Students.findById(studentId);
  let totalClasses = (
    await Sections_Class.find({ Students: studentId }).populate({
      path: "Class",
      select: "_id",
    })
  ).map((e) => e.Class._id); //total Classes in which the fukin student was
  let totalSessions = await Session.find({
    Classes: { $in: totalClasses },
  }).select("_id Classes");
  totalSessions.forEach((ses) => {
    totalClasses.forEach((id) => {
      if (ses.Classes.includes(id.toString())) {
        ClassSessionPair[ses._id.toString()] = id.toString();
      }
    });
  }); // to allocate the key value pairs to ClassSessionPair
  const FrequentPayload = await CalculateFrequentDues(
    totalSessions,
    Student,
    ClassSessionPair
  );
  const OneTimePayload = await CalculateOneTimeDues(Student);
  payload.Dues = OneTimePayload.Dues + FrequentPayload.Dues;
  payload.PendingFee = OneTimePayload.PendingFee + FrequentPayload.PendingFee;
  return payload;
}

async function CalculateFrequentDues(totalSessions, student, ClassSessionPair) {
  const payload = { Dues:0, PendingFee:0 };
  const totalTransactions = await Transactions.aggregate([
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
        "Transactions.paymentType": "Registered",
      },
    },

  ]);
  
  const paymentConfigs = await PaymentConfig.find({
    session: { $in: totalSessions },
    isDeprecated: false,
  });
  paymentConfigs.forEach((pay) => {
    let Amount;
    if (pay.feeStatus.includes("Same")) {
      Amount = pay.classes[0].amount;
    } else {
      Amount = pay.classes.find(
        (cl) =>
          cl.classId.toString() == ClassSessionPair[pay.session.toString()]
      )?.amount;
    }

    if (pay.feeFrequency == "Monthly" || pay.feeFrequency == "Custom") {
      pay.paymentMonths.forEach((pm) => {
        if (pm.isPayment) {
          const isPaid = totalTransactions.find(
            (tr) =>
              tr.Transactions.PaymentConfigId ==
                pay._id.toString() &&
              pm.month == tr.Transactions.month &&
              pm.year == tr.Transactions.year
          );
          if (!isPaid) {
            if (moment(pm.paymentDate).isSameOrBefore(moment())) {
              if (moment(student.DOA).isSameOrBefore(moment(pm.paymentDate))) {
                payload.Dues += Amount;
                payload.PendingFee++;
              }
            }
          }
        }
      });
    } 
    else if (pay.feeFrequency == "Yearly") {
      const isPaid = totalTransactions.find(
        (tr) =>
          tr.Transactions.PaymentConfigId == pay._id.toString()
      );
      if (!isPaid) {
        payload.Dues += Amount;
        payload.PendingFee++;
      }
    }
  });
  return payload;
}

async function CalculateOneTimeDues(student) {
  const payload = { Dues:0, PendingFee:0 };
  if (student.ConsiderOneTimeFee) {
    const paymentConfig = await PaymentConfig.findOne({
      isDeprecated: false,
      session: student.firstSession,
    });
    const Transaction = await Transactions.aggregate([
      {
        $match: {
          Student: new ObjectId(student._id),
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
          "Transactions.paymentType": "Registered",
          "Transactions.paymentConfigId": paymentConfig._id,
        },
      },
    ]);
    if (Transaction.length == 0) {
      let amount;
      if (paymentConfig.feeStatus.includes("Same")) {
        amount = paymentConfig.classes[0].amount;
      } else {
        amount = paymentConfig.classes.find(
          (cl) => cl.classId.toString() == student.firstClass.toString()
        )?.amount;
      }
      payload.Dues += amount;
      payload.PendingFee++;
    }
  }

  return payload;
}

module.exports = { GetDuesShallowDetailsFn };
