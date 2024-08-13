const PaymentConfig = require("../../../../models/PaymentConfigs");
const Students = require("../../../../models/Students");
const Transactions = require("../../../../models/Transactions");
const {
  GetAdditionalTransactionPopulationStages,
} = require("../FilteredData/CalculateMonthlyFeeReport");
const { ObjectId } = require("mongodb");
const moment = require("moment")
const Classes = require("../../../../models/Class");
const Sections_Class = require("../../../../models/Sections_Class");
//Type =  "Pending" | "Paid"
const CalculateMonthlyStdFeeReport = async (
  paymentConfig,
  month,
  year,
  Class,
  Type ,
  
) => {
  try {
    let payload = { amount: 0, students: [], class: null,status:"Pending" };
    const StudentIds = [];
    //? Get the students in the selected Class
    const sections = await Sections_Class.find({ Class }).select("Students");
    sections.map((sec) => StudentIds.push(...sec.Students));

    const ClassDetails = await Classes.findById(Class).select("name _id");
    payload.class= ClassDetails

    const pConfig = await PaymentConfig.findById(paymentConfig).select(
      "feeStatus classes paymentMonths"
    );

    function GetAmountAndStatus(feeStatus, classes,paymentMonths) {
      const paymentMonthDoc = paymentMonths.find(pay=>(pay.month==month&&pay.year==year))
      if(paymentMonthDoc.isPayment) {
        const start_date = moment(paymentMonthDoc.paymentDate)
        if(start_date.isSameOrBefore(moment())) payload.status =  'Pending'
        else payload.status =  'Upcoming'
      }
      else {
        payload.status =  'No Fees'
      }

      if (feeStatus.includes("Same")) {
        payload.amount = classes?.[0]?.amount || 0;
      } else {
        payload.amount = classes?.[0]?.amount || 0;
      }
    }

    GetAmountAndStatus(pConfig.feeStatus, pConfig.classes,pConfig.paymentMonths);
    let PaidStudents =[]
if(payload.status != "No Fees") {

 PaidStudents = await Transactions.aggregate([
    ...(GetAdditionalTransactionPopulationStages(StudentIds)),
      {
        $unwind: {
          path: "$Transactions",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "Transactions.paymentType": "Registered",
          "Transactions.paymentConfigId": new ObjectId(paymentConfig),
          "Transactions.month": month,
          "Transactions.year": year,
          isCancelled: false,
        },
      },

      {
        $project: {
          GRNO: "$Student.GRNO",
          _id: "$Student._id",
          currentClass: "$Student.currentClass",
          FirstName: "$Student.FirstName",
          LastName: "$Student.LastName",
          fatherName: "$Student.fatherName",
          Invoice: 1,
        },
      },
    ]);
}
if(payload.status != "No Fees"){

    if (Type == "Paid") {
      payload.students = PaidStudents;
    } else {
      //! It needs to be updated. I should get the students from the session instead of currentClass there is big bug in that!
      const PaidStudentId = PaidStudents.map((pay) => pay._id);
      const UnPaidStudents = await Students.find({
        $and: [{ _id: { $nin: PaidStudentId } }, { _id: { $in: StudentIds } }],
      }).select("GRNO currentClass FirstName LastName fatherName ");
      payload.students = UnPaidStudents;
    }
  }
    return payload; 
  } catch (err) {
    console.log(err);
  }
};
module.exports = { CalculateMonthlyStdFeeReport };
