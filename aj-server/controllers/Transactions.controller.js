const moment = require("moment");
const Students = require("../models/Students");
const TransactionsScema = require("../models/Transactions");
const Respond = require("../Helpers/ResponseHandler");
const PaymentConfig = require("../models/PaymentConfigs");
const Session = require("../models/Session");
const {
  CalculatePaymentConfigs,
} = require("./utils/Transaction/CalculateReadTransactionMetaFilters");
const { CalculateFeeDues } = require("./utils/Transaction/CalculateFeeDues.utils");
const Transactions = require("../models/Transactions");

async function CreateTransaction(req, res) {
  let { payload } = req.body;
  try {
    let Payload = { ...payload, RecievedBy: req.AdminId };
    if(payload.Time){ Payload.Time = new Date(Payload.Time).toISOString(); Payload.isDelayedRegistory = true}
    else {Payload.Time = new Date().toISOString()}
    
    const savedTransaction = await Transactions.create(Payload);
    let transaction = await TransactionsScema.findById(savedTransaction._id)
    .populate({ path: "Student", select: "FirstName LastName GRNO" })
    .populate({ path: "RecievedBy", select: "Name" })
    Respond({res,payload:transaction,success:true})
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message ,success:false});
  }
}

async function SearchStudent(req, res) {
  let student = await Students.findOne({ GRNO: req.body.GRNO }).select("-sCNIC -fCNIC -mCNIC -WA -contacts")
  let InvoiceNumber = await TransactionsScema.find({}).sort({ Invoice: -1 });
  if (student) {
    let sessionId = await Session.findOne({isActive:true}).select("_id")
    let paymentDetails = await PaymentConfig.find({
      isDeprecated: false,
      session: sessionId._id,
    }).select("feeTitle classes");
    let ClassbasedFeeInfo = {};
    JSON.parse(JSON.stringify(paymentDetails)).forEach((elm) => {
      ClassbasedFeeInfo[elm.feeTitle] = elm.classes.find(
        (pre) => pre.classId.toString() == student.CurrentClass
      )?.amount;
    });
    let { Dues, FeeInfo} = await CalculateFeeDues(student);
    Respond({
      res,
      payload: {
        Dues: Dues,
        StudentInfo: student,
        FeeInfo,
        Invoice: InvoiceNumber[0]?.Invoice ? InvoiceNumber[0].Invoice + 1 : 1,
        ClassbasedFeeInfo,
      },
    });
  } 
  else {
    res.status(404)
      .json({
        message: "Student not found",
        payload: {
          Invoice: InvoiceNumber[0]?.Invoice ? InvoiceNumber[0].Invoice + 1 : 1,
        },
      });
  }
}

async function ReadTransactions(req, res) {
  let Limit = process.env.TransactionPerRequest;
  let { transactionType, searchMode, count, Input: q ,DateRange } = req.body;
  try {
    let Query = {isCancelled:false};
    if (q) {
      if (searchMode == "Invoice") Query["Invoice"] = q;
      else {
        let std = await Students.findOne({ GRNO: q });
        Query["Student"] = std ? std?._id : "123456789123456789123456";
      }
    }
     else {
          Query["Transactions"] = {
            $elemMatch: {
              paymentType: transactionType == "Custom" ?  "Custom" : "Registered",
            },
          };

    if(DateRange){
      let start = moment(new Date(DateRange.start)).toISOString();
      let end = moment(new Date(DateRange.end)).toISOString();
      Query["Time"] = {$gte:start, $lte:end}
    }

    }
    let DataLength = await TransactionsScema.countDocuments(Query);
    let transactions = await TransactionsScema.find(Query)
    .populate({ path: "Student", select: "FirstName LastName GRNO" })
    .populate({ path: "RecievedBy", select: "Name" })
    .skip(Limit * ( count - 1 ))
    .limit(Limit)
    .sort("-Time");
    res.json({ success: true, payload: transactions, DataLength, count });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
}

async function ReadTransactionsMeta(req, res) {
  let paymentConfigs = await CalculatePaymentConfigs();
  res.json({ payload: { paymentConfigs } });
}

async function SetTransactionConfig(req, res) {
  let { Monthly, Annual, dueDate } = req.body;
  try {
    let Find = { Year: moment().year().toString() };
    let payload = { Monthly, Annual, dueDate };
    let month = moment().format("MMMM");
    // let Config = Global_Fee_Preferences.findOne({Year:moment().year().toString,Months:{$elemMatch:{month}}})
    if (!req.body.month) {
      let updated = await Global_Fee_Preferences.findOneAndUpdate(Find, {
        $push: { Months: { ...payload, month } },
      });
    } else {
      await Global_Fee_Preferences.updateOne(
        { ...Find, Months: { $elemMatch: { month: req.body.month } } },
        { "Months.$": payload }
      );
    }
    res.json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.error("Error setting transaction config:", error);
    res
      .status(500)
      .json({ sucsess: false, message: "Error setting transaction config" });
  }
}

async function getDetailedTransactions(req, res) {
  let { id } = req.params;
  if (!id||id.length!=24) return res.status(404).json({ message: "Invalid ID" });
  let Transaction = await TransactionsScema.findById(id)
    .populate({ path: "Student", select: "FirstName LastName GRNO" })
    .populate({ path: "RecievedBy", select: "Name" })
    .populate({
      path: "Transactions.paymentConfigId",
      select: "session",
      populate: { path: "session", select: "acedmic_year session_name" },
    });
  if (!Transaction)
    return res.status(404).json({ message: "Transaction Not Found" });
  let Payload = JSON.parse(JSON.stringify(Transaction));
  Payload.Transactions.forEach((tr, i) => {
    if (tr.paymentType == "Registered") {
      Payload.Transactions[i]["session"] =
        tr.paymentConfigId?.session?.session_name +
        " " +
        tr.paymentConfigId?.session?.acedmic_year;
    }
  });
  Respond({ res, payload: Payload });
}

async function CancelnRestoreTransaction(req, res) {
  let { id } = req.params;
  try {
    let Transaction = await TransactionsScema.findById(id).select("isCancelled")
    if(Transaction){
      await TransactionsScema.findByIdAndUpdate(id, {
        isCancelled: !Transaction.isCancelled,
      });
      Respond({ res, message: ` ${!Transaction.isCancelled? "Cancelled":"Restored"} successfully !` });
    }else{
      Respond({ res,error:"Transaction not found", message: "Transaction not found",status:401 });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error cancelling transaction" });
  }
}

module.exports = {
  CreateTransaction: CreateTransaction,
  ReadTransactions,
  SearchStudent,
  ReadTransactionsMeta,
  SetTransactionConfig,
  getDetailedTransactions,
  CancelnRestoreTransaction,
};
