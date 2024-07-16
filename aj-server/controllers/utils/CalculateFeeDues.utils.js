const moment = require("moment");
const PaymentConfig = require("../../models/SchoolPayments");
const Sections_Class = require("../../models/Sections_Class");
const lod = require("lodash");
const Session = require("../../models/Session");
const Transactions = require("../../models/Transactions");
const CalculateFeeDues = async (student) => {
  let Dues = [];
  let totalAmountFromStart = [];
  let StdAdmissionMonthIndex = moment(student.DOA);
  let FeeTransactions = await Transactions.find({
    Student: student._id,
  }).select("Transactions");
  let Sections = await Sections_Class.find({ Students: student._id }).select(
    "Class"
  ); // * I got all the sections in which the student was in
  let Sessions = await Session.find({
    Classes: { $in: Sections.map((e) => e.Class) },
  }).select("_id"); //* I got all the sessions
  let SessionPaymentConfigs = await PaymentConfig.find({
    isDeprecated: false,
    feeScope: "Session-based",
    session: { $in: Sessions.map((e) => e._id) },
  }); //* I got all the payment configuration of the whole sessions in which the fuckin boy was!
  let GlobalPaymentConfigs = await PaymentConfig.find({isDeprecated:false,feeScope:"Global"})
  let GroupedConfigs = lod.groupBy(
    [...SessionPaymentConfigs,...GlobalPaymentConfigs],
    ({ feeFrequency }) => feeFrequency
  );
  Object.entries(GroupedConfigs).map((val) => {
    val[1].map((configs) => {
      let payload = { paymentConfigId: configs._id, feeFrequecy: val[0] ,feeTitle:configs.feeTitle };
      if (val[0] == "Monthly" || val[0] == "Custom") {
        payload.session = configs.session;
        let paymentMonths = configs.paymentMonths;
        paymentMonths.map((m) => {
          if (m.isPayment) {
            let monthIndex = moment(
              new Date(
                `${m.year}-${moment.months().indexOf(m.month) + 1}-01`
              ).toISOString()
            );
            if (monthIndex.isSameOrAfter(StdAdmissionMonthIndex)) {
              //* to validate the DOA ...
              let amount = configs.classes.find((cl) =>
                Sections.some(
                  ({ Class }) => Class.toString() == cl.classId.toString()
                )
              )?.amount;
              totalAmountFromStart.push({
                ...payload,
                ...m._doc,
                amount: amount,
              });
            }
          }
        });
      } else if (val[0] == "Yearly") {
        payload.session = configs.session;
        let amount = configs.classes.find((cl) =>
          Sections.some(
            ({ Class }) => Class.toString() == cl.classId.toString()
          )
        )?.amount;
        totalAmountFromStart.push({
          ...payload,
          paymentDate: configs.paymentDate,
          amount: amount,
        }); //* to validate the DOA... and to set the month as 1 as it's yearly fee!
      } else if (val[0] == "One Time") {
        console.log(student);
        if (
          !(student?.FinancialDetails.find(
            (e) =>
              e.paymentConfigId?.toString() == configs._id?.toString()
          )?.paid)
        ) {
          console.log("I am getting here " ,);
          Dues.push({ ...payload, amount: configs?.feeAmount ,feeFrequecy:"One Time" });
        }
      }
    });
  });

  totalAmountFromStart.forEach((elm) => {
    let paid = false;
    FeeTransactions.map(({ Transactions }) => {
      Transactions.map((t) => {
        if (t.paymentConfigId.toString() == elm.paymentConfigId.toString()) {
          if (elm.feeFrequecy == "Monthly" || elm.feeFrequecy == "Custom") {
            if (t.month == elm.month && t.year == elm.year && t.totalAmount) {
              paid: true;
            } else {
              paid: false;
            }
          } else if (elm.feeFrequecy == "Yearly") {
            if (t.totalAmount) {
              paid: true;
            } else {
              paid: false;
            }
          }
        }
      });
    });
    if (!paid) Dues.push(elm);
  });
let managedPurposes=  Object.entries(lod.groupBy(Dues,({paymentConfigId})=>paymentConfigId)).map(e=>({value:e[0],label:e[1]?.[0]?.feeTitle,feeFrequency:e[1]?.[0]?.feeFrequecy}))
  let FeeInfo = {Purposes:managedPurposes ,Dates:{},Amounts:{}};
  Dues.forEach(due=>{
    if(due.amount) {
        FeeInfo["Amounts"][due.paymentConfigId]=due.amount
    }
    if(due.year) {
      if (!FeeInfo["Dates"][due.paymentConfigId]) {
        FeeInfo["Dates"][due.paymentConfigId] = {}
      }
      if (!FeeInfo["Dates"][due.paymentConfigId][due?.year]) {
        FeeInfo["Dates"][due.paymentConfigId][due?.year] =  [due.month]
      }
        else{
          FeeInfo["Dates"][due.paymentConfigId][due?.year].push(due.month)
        }
    }
  })
  return { Dues, FeeInfo};
};

module.exports = { CalculateFeeDues };
