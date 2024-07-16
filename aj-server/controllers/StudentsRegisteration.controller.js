const Students = require("../models/Students");
const Respond = require("../Helpers/ResponseHandler");
const Sections_Class = require("../models/Sections_Class");
async function RegisterStudent(req, res) {
  let { payload  } = req.body;
  try {
    let student = await Students.create(payload); 
    await Sections_Class.findByIdAndUpdate(payload.Section,{$addToSet:{Students:student._id}})  
    // to register the student to section to keep the history and records
    res.json({
      success: true,
      messge: `Student becomes the part of your organization successfully `,
      payload: student,
    });
  } catch (err) {
    console.log(err);
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
