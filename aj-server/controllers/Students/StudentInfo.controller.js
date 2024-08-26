const Students = require("../../models/Students");

const FetchStudentInfo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "Invalid ID" });
    const student = await Students.findById(id)
      .select(
        "-TerminateEnrollment -TerminationDate -ConsiderOneTimeFee -firstAdmittedClass -createdAt -updatedAt -_id -__v "
      )
      .populate({ path: "CurrentClass", select: "name" })
      .populate({ path: "CurrentSection", select: "name" })
      .populate({ path: "firstClass", select: "name" })
    if (!student)return res.json({ success: false, message: "student not found" });
    return res.json({ success: true, payload: student });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = { FetchStudentInfo };
