const Transactions = require("../../models/Transactions");
const moment = require("moment");
async function EvaluateFeeYearly(Year, FeeType, StudentId, DOA) {
  let Docs = await Transactions.aggregate([
    {
      $unwind: {
        path: "$Transaction",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        year: { $year: "$createdAt" }, // Adding a new field "year" with the year extracted from the "createdAt" field
        month: { $month: "$createdAt" }, // Adding a new field "year" with the year extracted from the "createdAt" field
      },
    },
    {
      $match: {
        Student: StudentId,
        "Transaction.purpose": FeeType,
        year: parseInt(Year),
      },
    },
    {
      $group: {
        _id: "$month",
        docs: { $push: "$$ROOT" },
      },
    },
    {
      $unwind: {
        path: "$docs",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $replaceRoot: { newRoot: "$docs" },
    },
    {
      $project: {
        _id: 1,
        month: 1,
        Invoice: 1,
        totalAmount: 1,
        Time: 1,
        Transaction: 1,
      },
    },
  ]);
  let FeePreferences ={}
  let AYear = moment(DOA).year(); //admission Year
  let AMonth = moment(DOA).month(); //admission Month
  const Result = moment.months().map((month, monthIndex) => {
    let isFee = FeePreferences.Months.find((e) => e.month == month)?.Monthly;
    let payload = {
      month,
      hasPassedMonth: true,
      FeeDetail: null,
      isAdmitted: true,
    };
    if (isFee && monthIndex <= moment().month()) {
      if (AYear == +Year && AMonth > monthIndex) {
        return {
          ...payload,
          isSubmited: false,
          hasPassedMonth: true,
          FeeDetail: null,
          isAdmitted: false,
        };
      } else {
        let Transaction = Docs.find((e) => e.Transaction.month == month);
        if (Transaction) {
          return {
            ...payload,
            isSubmited: true,
            hasPassedMonth: true,
            FeeDetail: Transaction,
          };
        } else {
          return {
            ...payload,
            isSubmited: false,
            hasPassedMonth: true,
            FeeDetail: null,
          };
        }
      }
    } else {
      return {
        ...payload,
        isSubmited: false,
        hasPassedMonth: false,
        FeeDetail: null,
      };
    }
  });
  return Result;
}
module.exports = EvaluateFeeYearly;
