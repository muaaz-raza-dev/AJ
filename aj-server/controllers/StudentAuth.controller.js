const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Account = require("../models/StdAcconts");
const {
  GlobalRestrictionValidator,
  UserSpecificRestrictionValidator,
  StdRestrictionValidator,
  isLogOutRequired,
} = require("./utils/Auth/GlobalRestrictionValidator");
const { OK } = require("http-status-codes");
const HandleJWTToken = require("../Helpers/HandleTokenExpiry");
const SendMail = require("../utils/Send-Mail");
let secretKey = process.env.jwt_Secret;
const cookieKey = process.env.STD_COOKIE_KEY;
const forgotKey = process.env.FORGOT_COOKIE_KEY;
async function LoginStudent(req, res) {
  try {
    let { GRNO, password } = req.body;
    let account = await Account.findOne({ GRNO });
    if (account) {
      let isRestricted = false;
      isRestricted = await GlobalRestrictionValidator();
      if (!isRestricted) {
        isRestricted = UserSpecificRestrictionValidator(account);
        if (isRestricted)
          return res.status(403).json({
            success: false,
            message: "You are blocked by the server , Contact your admin .",
          });
      } else {
        return res.status(403).json({
          success: false,
          message: "Access temporarily blocked. Please try again later.",
        });
      }

      // Use the isPasswordCorrect method
      const isPasswordMatch = await account.isPasswordCorrect(password);
      if (isPasswordMatch) {
        if (account.isLogOutRequired) {
          await Account.findByIdAndUpdate(account._id, {
            isLogOutRequired: false,
          });
        }
        let token = jwt.sign({ userId: account._id }, secretKey, {
          expiresIn: "30 days",
        });
        res
          .cookie(cookieKey, token, {
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          })
          .status(OK)
          .json({
            success: true,
            message: "Logined Successfully",
            token: token,
            payload: account,
          });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    } else {
      res.status(401).json({ success: false, message: "Student not exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function VerifyTokenStudent(req, res) {
  try {
    let token = req.header("token");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Try with valid credentials" });
    }
    let { decodedToken, response } = HandleJWTToken(token, res);
    if (!decodedToken && token) return response;
    let user = await Account.findById(decodedToken.userId).select(
      "-password -LastLogin -isBlocked -isLogOutRequired -OTP"
    );
    if (user) {
      let isRistricted = false;

      isRistricted = await StdRestrictionValidator(); // Check the global Restriction
      if (!isRistricted) {
        isRistricted = UserSpecificRestrictionValidator(user); //Check the user specific restriction
        if (isRistricted)
          return res.status(403).json({
            success: false,
            message: "You are blocked by the server , Contact your admin .",
          });
        else {
          isRistricted = isLogOutRequired(user); // isLogoutRequired
          if (isRistricted)
            return res.status(403).json({
              success: false,
              message:
                "Re-login required , Login with your valid credentails again.",
            });
        }
      } else {
        return res.status(403).json({
          success: false,
          message: "Access temporarily blocked,Logging you out.",
        });
      }

      await Account.findByIdAndUpdate(decodedToken.userId, {
        LastLogin: new Date().toISOString(),
      });
      res.json({ success: true, message: "Verifed", payload: user });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Account verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function RequestPasswordChange(req, res) {
  const { gr } = req.body;
  const account = await Account.findOne({ GRNO: gr }).select("email username");
  if (!account) return res.status(401).json({ message: "Invalid GRNO" });
  if (!account.email) {
    return res
      .status(401)
      .json({ status: "no-source", message: "Invalid GRNO" });
  }
  let OTP = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  await SendMail(account, OTP);
  await Account.findByIdAndUpdate(account._id, { OTP });
  const token = jwt.sign({ gr }, process.env.OTP_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  res.cookie(forgotKey, token, {
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });
  return res.json({
    token,
    success: true,
    message: `We have sent you an OTP on ${account.email}. `,
  });
}
async function VerifyOTP(req, res) {
  const { otp } = req.body;
  const token = req.header(forgotKey);
  if (!token) return res.status(401).json({ message: "Invalid Token" });
  let { decodedToken, response } = HandleJWTToken(
    token,
    res,
    process.env.OTP_TOKEN_SECRET
  );
  if (!decodedToken) return response;
  const account = await Account.findOne({ GRNO: decodedToken.gr }).select(
    "OTP"
  );
  if (!account) return res.status(401).json({ message: "Invalid GRNO" });
  if (account.OTP != otp)
    return res.status(401).json({ message: "Invalid OTP" });

  const login_token = jwt.sign({ userId: account._id }, secretKey, {
    expiresIn: "30 days",
  });
  await Account.findByIdAndUpdate(account._id, { OTP: null });
  res.cookie(cookieKey, login_token, {
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days
  });
  return res.json({
    success: true,
    message: "Verified and Logined Successfully. Reset your password!",
  });
}

async function ResetPhoto(req, res) {
  const { photo } = req.body;
  if (!photo) return res.status(400).json({ message: "No Photo Provided" });
  try {
    await Account.findByIdAndUpdate(
      req.AdminId,
      { $set: { photo } },
      { new: true }
    );
    res.json({ success: true, message: "Photo Updated Successfully", photo });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function ResetPublicInfo(req, res) {
  const { Name, email } = req.body;
  if (!Name && !email)
    return res.status(400).json({ message: "No Info Provided" });
  try {
    await Account.findByIdAndUpdate(req.AdminId, { $set: { Name, email } });
    res.json({ success: true, message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function CheckPasswordSkip(req, res) {
  try {
    const account = await Account.findById(req.AdminId).select(
      "isSkipPassword -_id"
    );
    if (!account)
      return res
        .status(404)
        .json({ success: false, message: "Account not found." });
    if (account.isSkipPassword) {
      return res.json({
        success: true,
        message: "You have a chance to update your password!",
        payload: true,
      });
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: "No chance.You have to give password.",
          payload: false,
        });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function ResetPassword(req, res) {
  try {
    const { current, New } = req.body;
    const account = await Account.findById(req.AdminId)
    const EncrpytedPassword = await bcrypt.hash(New, 10);
    if (account.isSkipPassword) {
      await Account.findByIdAndUpdate(req.AdminId, {
        password: EncrpytedPassword,
        isLogOutRequired: true,
        isSkipPassword: false,
      });
      return res.json({
        success: true,
        message: "Password Updated Successfully",
      });
    }
     else {
      const isMatch = await bcrypt.compare(current, account.password);
      if (!isMatch) {

        return res
        .status(401)
          .json({ success: false, message: "Incorrect Current Password." });
        }

 
  await Account.findOneAndUpdate(
  { _id: req.AdminId },
  {
    password: EncrpytedPassword,
    isLogOutRequired: true,
    isSkipPassword: false,
  }
);
return res.json({
  success: true,
  message: "Password Updated Successfully",
});
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  LoginStudent,
  VerifyTokenStudent,
  RequestPasswordChange,
  VerifyOTP,
  ResetPhoto,
  ResetPublicInfo,
  CheckPasswordSkip,
  ResetPassword,
};
