const { ObjectId } = require("mongodb");
const lod = require("lodash")
const { GetDuesShallowDetailsFn } = require("./utils/StudentDuesShallow");
const { redis } = require("../../db");
const Transactions = require("../../models/Transactions");
const Students = require("../../models/Students");
const {
  CalculateCurrentFeeStatus,
} = require("./utils/StudentCurrentFeeStatus");
const Session = require("../../models/Session");
const moment = require("moment");
const PaymentConfig = require("../../models/PaymentConfigs");
const Respond = require("../../Helpers/ResponseHandler");
const { CalculateFeeRecordYearBased } = require("./utils/Fee Records/CalculateFeeRecordYearBased");
const { CalculateOneTimeFee } = require("./utils/Fee Records/CalculateOneTimeFee");
async function getShallowTransactionList(req, res) {
  const transactions = await Transactions.aggregate([
    {
      $match: {
        Student: new ObjectId(req.details.Student),
      },
    },
    {
      $sort: {
        Time: -1,
      },
    },
    { $limit: 5 },
    {
      $unwind: {
        path: "$Transactions",
        preserveNullAndEmptyArrays: false,
      },
    },
    { $project: { amount: 1, Transactions: 1, Time: 1, Invoice: 1 } },
  ]);
  return Respond({ res, payload: transactions });
}
async function getDetailedInvoice(req, res) {
  const { Invoice } = req.params;
  const transaction = await Transactions.findOne({
    Student: req.details.Student,
    Invoice,
    isCancelled: false,
  })
    .select("-isDelayedRegistory")
    .populate({ path: "Student", select: "FirstName LastName GRNO" })
    .populate({ path: "RecievedBy", select: "Name username" })
    .populate({ path: "Transactions.sessionId", select: "acedmic_year" });
  if (!transaction) {
    return Respond({
      res,
      message: "Transaction not found",
      success: false,
      status: 404,
    });
  }
  return Respond({ res, payload: transaction });
}

async function getDuesShallowDetails(req, res) {
  let payload = await redis?.get(`shallow-dues:{req.details.Student}`);
  if (payload) {
    return Respond({ res, payload: JSON.parse(payload) });
  }
  payload = await GetDuesShallowDetailsFn(req.details.Student);
  await redis?.set(
    `shallow-dues:${req.details.Student}`,
    JSON.stringify(payload),
    "EX",
    3600 / 2
  ); // Cache for 1/2 hour
  return Respond({ res, payload });
}
async function getLastTransactionShallowDetails(req, res) {
  const lastTransaction = await Transactions.findOne({
    Student: req.details.Student,
  })
    .sort({ Time: -1 })
    .select("amount");

  return Respond({ res, payload: lastTransaction });
}
async function getRecentFeeStatus(req, res) {
  const student = await Students.findById(req.details.Student).select(
    "CurrentClass"
  );
  const payload = await CalculateCurrentFeeStatus(student);
  return Respond({ res, payload: payload });
}

async function getFeeRecordFilters(req, res) {
  let Payload = {}
  const student = await Students.findById(req.details.Student)
    .select("firstSession")
    .populate({ path: "firstSession", select: "start_date _id" });
  const sessions = (
    await Session.find({
      start_date: {
        $gte: new Date(student.firstSession.start_date).setHours(0, 0, 0, 0),
      },
    }).select("_id")
  ).map((e) => e._id.toString());

  sessions.push(student.firstSession._id);

  const paymentConfigs = await PaymentConfig.find({
    session: { $in: sessions },
    isDeprecated: false,
  });

  const payload = {};

  paymentConfigs.map((e) => {
    const feeFrequency = e.feeFrequency;
    if (feeFrequency == "Yearly") {
      if (payload[moment(e.paymentDate).year().toString()]) {
        payload[moment(e.paymentDate).year().toString()][e.feeTitle].push(
          e._id
        );
      } else {
        payload[moment(e.paymentDate).year().toString()] = {
          [e.feeTitle]: [e._id],
        };
      }
    } else {
      const localPayload = {};
      e.paymentMonths.forEach((pay) => {
        if (!localPayload[pay.year]) {
          localPayload[pay.year] = { [e.feeTitle]: e._id };
        }
      });

      Object.keys(localPayload).forEach((year) => {
        if (payload[year]) {
          payload[year][e.feeTitle] = [
            ...(payload[year]?.[e.feeTitle] || []),
            localPayload[year]?.[e.feeTitle],
          ];
        } else {
          payload[year] = { [e.feeTitle]: [localPayload[year][e.feeTitle]] };
        }
      });
    }
  });

  const years = Object.keys(payload);
  Payload = {years, feeTypes: payload}
  return Respond({ res, payload: Payload });
}
async function getOneTimeFeeRecord(req,res){
  const student= await Students.findById(req.details.Student)
  if(student.ConsiderOneTimeFee){
    const payload =  await CalculateOneTimeFee(student)
    return Respond({res, payload})  
  }
  else{
    return Respond({res, payload:[]})
  }
}
async function getFeeRecords(req, res) {
const {year,feeType}  = req.body 
const student = await Students.findById(req.details.Student)
const payload = await CalculateFeeRecordYearBased(year,feeType,student)
return Respond({res,payload})
}


async function getTransactionHistory(req, res) {
  const { year } = req.body;
  const startYear = new Date(year, 0, 1); 
  const endYear = new Date(year, 11, 31, 23, 59, 59);
  const transactions = await Transactions.find({
    isCancelled: false,
    Student: req.details.Student,
    Time: { $gte: startYear, $lte: endYear }
  })
  .sort("-Time")
  .select("Time Transactions Invoice amount");

  const sorted = lod.groupBy(transactions, ({ Time }) => moment(Time).format("MMMM YYYY"));
  return Respond({ res, payload: sorted });
}
async function getTransactionHistoryYears(req, res) {
  const Student  = await Students.findById(req.details.Student).select("firstSession").populate({path:"firstSession",select:"start_date"})
  const startYear = moment(Student.firstSession.start_date).year()
  const years = []
  for (let index = startYear; index <= moment().year(); index++) {
    years.push(index)
  }
  return Respond({ res, payload: years });
}

module.exports = {
  getShallowTransactionList,
  getTransactionHistoryYears,
  getFeeRecords,
  getTransactionHistory,
  getOneTimeFeeRecord,
  getDetailedInvoice,
  getDuesShallowDetails,
  getLastTransactionShallowDetails,
  getRecentFeeStatus,
  getFeeRecordFilters,
};
