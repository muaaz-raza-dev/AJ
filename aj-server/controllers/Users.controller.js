const { redis } = require("../db");
const Respond = require("../Helpers/ResponseHandler");
const GlobalConfig = require("../models/GlobalConfig");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
    let Users = await redis?.get("users")
    if(!Users)
    {
        Users = (
            await User.find({ _id: { $ne: req.AdminId }, Role: { $ne: "chief admin" } })
        ).map((user) => ({ ...user._doc, isStaff: user.StaffId ? true : false }));
        await redis?.set("users",JSON.stringify(Users))  
    }
    else {
      let temp_user = Users
      Users = JSON?.parse(temp_user)||temp_user
    }

  let config = await GlobalConfig.countDocuments();
  if (config == 0) await GlobalConfig.create({ isTemporaryBlocked: false });
  let isTemporaryBlocked = await GlobalConfig.findOne({});
  res
    .status(200)
    .json({
      payload: {
        Users,
        isTemporaryBlocked: isTemporaryBlocked.isTemporaryBlocked,
      },
    });
};

const ToggleGlobalRestriction = async (req, res) => {
  let isTemporaryBlocked = (await GlobalConfig.findOne({})).isTemporaryBlocked;
  await GlobalConfig.findOneAndUpdate(
    {},
    { isTemporaryBlocked: !isTemporaryBlocked }
  );
  res
    .status(200)
    .json({
      message: isTemporaryBlocked
        ? "Accessible by all users again."
        : "Temporary blocked all users.",
    });
};

const ToggleBlockIndividualUser = async (req, res) => {
  let { userId } = req.body;
  try {
    await redis?.del("users")
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    let isBlocked = user.isBlocked;
    await User.findByIdAndUpdate(userId, { isBlocked: !isBlocked });
    res
      .status(200)
      .json({ message: isBlocked ? "User unblocked" : "User blocked" });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Somthing went wrong try again later." });
  }
};

const CreateUserAccount = async (req, res) => {
  let { payload } = req.body;
  if (payload.StaffId == "none") delete payload.StaffId;
  bcrypt.hash(payload.password, 8, async function (err, hash) {
    if (!err){
         await User.create({ ...payload, password: hash }) 
        await redis?.del("users")
}
    else
      return res
        .status(501)
        .json({
          success: false,
          message: "An error occured . Try again later.",
        });
  });
  Respond({ res, message: "User Registered Successfully" });
};

const GetUserInfo = async (req, res) => {
  let { id } = req.params;
  if (!id || id.length != 24)
    return res.status(404).json({ success: false, message: "Invlaid Id" });
  let user = await User.findById(id).select(
    "-password -logOutRequired -isBlocked -photo -LastLogin"
  );
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  res.status(200).json({ payload: user });
};

const UpdateUserInfo = async (req, res) => {
  let {
    body: { payload },
    params: { id },
  } = req;
  try {
    if (!payload.password) {
      await User.findByIdAndUpdate(id, payload);
    } else {
      bcrypt.hash(payload.password, 8, async function (err, hash) {
        if (!err)
          await User.findByIdAndUpdate(id, { ...payload, password: hash });
        else
          return res
            .status(501)
            .json({
              success: false,
              message: "An error occured. Try again later.",
            });
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "User Updated Successfully" });
  } catch (err) {
    return res
      .status(501)
      .json({
        success: false,
        message: "Somthing went wrong try again later.",
      });
  }
};

const DeleteUserAccount = async (req, res) => {
  const { id } = req.params;
  if (!id || id.length != 24)
  return Respond({ res, status: 404, message: "Invalid Id" });
  await User.findOneAndDelete({ _id: id, Role: { $ne: "chief admin" } });
  await redis?.del("users")
  Respond({ res, message: "user no longer exists." });
};


module.exports = {
  getUsers,
  ToggleGlobalRestriction,
  ToggleBlockIndividualUser,
  CreateUserAccount,
  GetUserInfo,
  UpdateUserInfo,
  DeleteUserAccount,
};
