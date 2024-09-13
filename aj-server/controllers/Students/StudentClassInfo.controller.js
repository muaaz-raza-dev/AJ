const Students = require("../../models/Students");

const getStdClassDetails = async(req, res) => {
  const Class = await Students.findById(req.details.Student)
    .select("CurrentClass CurrentSection RollNo GRNO")
    .populate({ path: "CurrentClass", select: "name" })
    .populate({ path: "CurrentSection", select: "name Students ClassTeacher start_date" })
    .populate({
      path: "CurrentSection.ClassTeacher",
      select: "firstName lastName",
    });
    const result = JSON.parse(JSON.stringify(Class))
    const Payload = {class_name:result.CurrentClass.name,section_name:result.CurrentSection.name,start_date:result.CurrentSection.start_date,ClassTeacher:result.CurrentSection.ClassTeacher,Students:result.CurrentSection.Students.length,RollNo:Class.RollNo,GRNO:Class.GRNO}
  res.json({
    message: "Shallow class details retrieved successfully",
    payload: Payload,
  });
};

module.exports = { getStdClassDetails };
