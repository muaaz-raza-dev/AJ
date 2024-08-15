const PaymentConfig = require("../../../../models/PaymentConfigs");
const Students = require("../../../../models/Students")
const Transactions = require("../../../../models/Transactions");
const { GetAdditionalTransactionPopulationStages } = require("../FilteredData/CalculateMonthlyFeeReport");
const Classes = require("../../../../models/Class");
const moment = require("moment")
const { ObjectId } = require("mongodb");

const Sections_Class = require("../../../../models/Sections_Class");

const CalculateYearlyStdFeeReport = async (paymentConfig,Class,Type) => { 
    let payload = { amount: 0, students: {}, class: null,status:"Pending" ,Info:{totalStudents:0,totalPaidAmount:0,totalPendingAmount:0}}; //status | "Pending" | "Upcoming"
    const StudentIds = []
       //? Get the students in the selected Class
    const sections = await Sections_Class.find({ Class }).select("Students");
    sections.map((sec) => StudentIds.push(...sec.Students));

    payload.Info.totalStudents = await Students.countDocuments({ _id: { $in: StudentIds },TerminateEnrollment:false})

    const ClassDetails = await Classes.findById(Class).select("name _id");
    payload.class= ClassDetails

    const pConfig = await PaymentConfig.findById(paymentConfig).select("feeStatus classes paymentDate");
    function GetAmountAndStatus(feeStatus, classes,paymentDate) {
        const start_date = moment(paymentDate)
        if(start_date.isSameOrBefore(moment())) {
            payload.status =  'Pending'
        }
        else payload.status =  'Upcoming'

        if (feeStatus.includes("Same")) {
          payload.amount = classes?.[0]?.amount || 0;
        } else {
          payload.amount = classes?.[0]?.amount || 0;
        }
      }
  
      GetAmountAndStatus(pConfig.feeStatus, pConfig.classes,pConfig.paymentDate);


    const PaidStudents = await Transactions.aggregate([
    ...(GetAdditionalTransactionPopulationStages(StudentIds)),
        {
          $unwind: {
            path: "$Transactions",
            preserveNullAndEmptyArrays: false
          } 
        } ,
        {
            $match: {
              "Transactions.paymentType":"Registered",
              "Transactions.paymentConfigId":new ObjectId(paymentConfig._id),
              "isCancelled":false,
            }
          },
    ]) 

    function CalculateTotalPaidAmount(trs){
    payload.Info.totalPaidAmount =  trs.reduce((acc,tr)=>acc+tr?.amount?.totalAmount,0)
    }
    
    CalculateTotalPaidAmount(PaidStudents)

    if(payload.status != "No Fees"){
      const PaidStudentId = PaidStudents.map((pay) => pay._id);
      const UnPaidStudents = await Students.find({
        $and: [{ _id: { $nin: PaidStudentId } }, { _id: { $in: StudentIds } }],
      }).select("GRNO currentClass FirstName LastName fatherName");
      
      payload.Info.totalPendingAmount = UnPaidStudents.length*payload.amount
    if (Type == "Paid") {
        payload.students = PaidStudents;
    }
    else {
      payload.students = UnPaidStudents;

    }
    }
      return payload;

}
module.exports = CalculateYearlyStdFeeReport