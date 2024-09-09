const Respond = require("../Helpers/ResponseHandler");
const Students = require("../models/Students");
const Account = require("../models/StdAcconts");
const bcrypt = require("bcryptjs");

const getStudentAccountInfo = async (req, res) => {
  try {
    const { gr } = req.params;

    let student = await Students.findOne({GRNO:gr});

    if (!student) return res.status(404).json({ message: "Student Not Found" });

    let accountInfo = await Account.findOne({ Student: student._id })
    if (!accountInfo)return res.status(404).json({ message: "Account Not Found" });

    return Respond({ res,payload: accountInfo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const toggleStdAccountRestriction = async (req, res) => {
  try {
    const {id } = req.params;
    let account = await Account.findById(id);
    if (!account) return res.status(404).json({ message: "Try with valid credentials" });
    const isBlocked = account.isBlocked ?? false
    await Account.findByIdAndUpdate(id,{isBlocked:!isBlocked},{new:true})
    return Respond({ res,message:"Done" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const resetPassword = async(req,res)=>{
  const {id,password} = req.body;
  let account = await Account.findById(id);
  if (!account) return res.status(404).json({ message: "Try with valid credentials" });
  const newPassword = await bcrypt.hash(password, 10);
  await Account.findByIdAndUpdate(id,{password:newPassword,isLogOutRequired:true,logins:[]})
  return Respond({ res,message:"Password updated successfully." });
}
module.exports = { getStudentAccountInfo,toggleStdAccountRestriction,resetPassword };
