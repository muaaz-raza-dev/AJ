const Students = require("../models/Students");
const Sections_Class = require("../models/Sections_Class");
const Session = require("../models/Session");
const Respond = require("../Helpers/ResponseHandler");
const GlobalConfig = require("../models/GlobalConfig");
const { redis } = require("../db");
async function RegisterStudent(req, res) {
  let { payload  } = req.body;
  try {
    let currentSession =await Session.findOne({isActive:true}).select("_id")
    let student = await Students.create({...payload,GRNO:(+payload.GRNO).toString(),firstSession:currentSession._id,firstClass:payload.CurrentClass}); 
    await Sections_Class.findByIdAndUpdate(payload.CurrentSection,{$addToSet:{Students:student._id}})  
    await GlobalConfig.findOneAndUpdate({},{isSorted:false})

    // Delete Students from Redis db (cached)
    const reply = await redis?.scan(0, 'MATCH', 'students:*', 'COUNT', '100');
    const keys = reply[1];
    if (keys.length) {
      await redis?.del(keys);
    }
    await redis?.del(`totalstudents`)

    // to register the student to section to keep the history and records
    res.json({
      success: true,
      message: `Student becomes the part of your organization successfully `,
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

async function AutoGR(req,res){
const Config = await GlobalConfig.findOne({})
if(!Config) {res.status(403).json({success:false,message:"Auto GRNO is off."})}
const Student = await Students.findOne({}).sort("-GRNO").select("GRNO").lean();
let GRNO = Student ? (+Student.GRNO + 1) : 1;
return Respond({res,payload:GRNO})

}

module.exports = { RegisterStudent, GRValidation,AutoGR}
