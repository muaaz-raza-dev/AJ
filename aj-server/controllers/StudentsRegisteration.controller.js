const Students = require("../models/Students");
const Finance = require("../models/Students_Finance");
const StudentsHistory = require("../models/Student_History");
const Respond = require("../Helpers/ResponseHandler");
async function RegisterStudent(req, res) {
  let {
    FirstName,
    LastName,
    photo,
    email,
    contact,
    fatherName,
    DOB,
    Gender,
    Address,
    GRNO,
    RollNo,
    Section,
    NewAdmission,
    Class,
    DOA,
    PolioPermission,
    CovidVaccine,
    sCNIC,
    fCNIC,
    mCNIC,
    WA,
    FinancialDetails,
  } = req.body;
  try {
    let student = await Students.create({
      FirstName,
      LastName,
      photo,
      email,
      contact,
      fatherName,
      DOB,
      Gender,
      Address,
      GRNO: +GRNO,
      RollNo: +RollNo,
      Section,
      NewAdmission,
      Class,
      DOA,
      PolioPermission,
      CovidVaccine,
      sCNIC,
      fCNIC,
      mCNIC,
      WA,
    });
    await Finance.create({ Student: student._id, ...FinancialDetails });
    await StudentsHistory.create({
      Student: student._id,
      ClassHistory: [{ Class: Class}],
      AnnualFee: [ { Fee: FinancialDetails.AnnualFee } ],
      MonthlyFee: [  { Fee: FinancialDetails.MonthlyFee } ],
    });
    res.json({
      success: true,
      messge: `Student with ${GRNO} is registered`,
      payload: student,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to register student",
        error: err.message,
      });
  }
}
async function GRValidation(req, res) {
  let Student = await Students.findOne({ GRNO: req.body.GRNO }).select(
    "GRNO  _id FirstName Class "
  );
  console.log(Student);
  if (Student) {
    res
      .status(400)
      .json({
        success: false,
        message: `Student with GRNO ${req.body.GRNO} already exists`,
        payload: Student,
      });
  } else {
    res.json({ success: true, message: "No duplicate GRno exists" });
  }
}


module.exports = { RegisterStudent, GRValidation}
