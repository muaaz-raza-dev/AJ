const Students = require("../models/Students");
let Limit = process.env.StdPerRequest;
async function ReadStudents(req, res) {
  let { count } = req.body;
  try {
    const totalStudents = await Students.countDocuments();
    let students = await Students.find({})
      .limit(Limit)
      .skip((count == 0 ? count : count - 1) * Limit)
      .select(
        "LastName FirstName fatherName DOA CurrentSection GRNO contact RollNo CurrentClass WA email"
      );
    res.json({ success: true, payload: students, totalStudents, count });
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

async function SearchStudents(req, res)
 {
  let { q, SearchMode,Filters } = req.body;
  try {
    let students = [];
    let Inputs = [];
    let ClassCondition = {}
    if (Filters.Class && Filters.Class != "All"){ClassCondition.Class =Filters.Class};
    if (Filters.Covid) Inputs.push({CovidVaccine : Filters.Covid});
    if (Filters.Polio) Inputs.push({PolioPermission : Filters.Polio});
    let query ={...ClassCondition};
 if (Inputs.length>0) {
        FinalQuery.$or=Inputs
      }

    if (SearchMode == "Name") {
        query.$text = { $search: q } 
      students = await Students.find(query).select(
        "LastName FirstName fatherName GRNO RollNo Class WA email contact"
      );
    } else {
        query.GRNO = {$regex: q,$options: "i"}
      students = await Students.find(query).select("LastName FirstName fatherName DOA contact Section GRNO RollNo Class WA email");
    }
    res.json({
      success: true,
      payload: students,
      hasData: students.length != 0,
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

async function FilterStudents(req, res) {
  let { Filters, count } = req.body;
  try {
      let Inputs = [];
      let ClassCondition = {}
      if (Filters.Class && Filters.Class != "All"){ClassCondition.Class =Filters.Class};
      if (Filters.Covid) Inputs.push({CovidVaccine : Filters.Covid});
      if (Filters.Polio) Inputs.push({PolioPermission : Filters.Polio});
      let FinalQuery={...ClassCondition}
      if (Inputs.length>0) {
        FinalQuery.$or=Inputs
      }
      let students = await Students.find(FinalQuery)
      .limit(Limit)
      .skip((count == 0 ? count : count - 1) * Limit)
      .select(
        "LastName FirstName fatherName DOA Section GRNO RollNo contact Class WA email"
      );
    let totalStudents = await Students.find(FinalQuery).countDocuments();
    res.json({ success: true, payload: students, totalStudents, count });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to filter students by class",
        error: err.message,
      });
  }
}

module.exports = { ReadStudents, SearchStudents, FilterStudents };
