const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Account = require("../../models/StdAcconts");
const {
  GlobalRestrictionValidator,
  UserSpecificRestrictionValidator,
  StdRestrictionValidator,
  isLogOutRequired,
} = require("../utils/Auth/GlobalRestrictionValidator");
const { OK } = require("http-status-codes");
const HandleJWTToken = require("../../Helpers/HandleTokenExpiry");
const SendMail = require("../../utils/Send-Mail");
const Students = require("../../models/Students");
const moment = require("moment");
const { getExtensiveLoginInfo } = require("../../utils/getLocationFromIp");
const {
  CreateAndLoginNewStdAccount,
} = require("./utils/auth/CreateAndLoginNewStdAccount");
const { StdGlobalRestrictionValidator, StdIpValidator } = require("./utils/auth/StdrestrictionValidators");
let secretKey = process.env.jwt_Secret;
const cookieKey = process.env.STD_COOKIE_KEY;
const forgotKey = process.env.FORGOT_COOKIE_KEY;

async function LoginStudent(req, res) {
  try {
    let { GRNO, password } = req.body;

    let request_account_token = req.header("token");
    let decodedToken =null ;
    if (request_account_token) {
       decodedToken   = HandleJWTToken(request_account_token, res).decodedToken;
    }

    const userDetails = await getExtensiveLoginInfo(req);

    const student = await Students.findOne({ GRNO }).select("_id FirstName photo email DOB");

    if (!student) {return res.status(401).json({ message: "Invalid Credentials" });}

    let account = await Account.findOne({ Student: student._id });

    {
      const { isRestricted, response } = await GlobalRestrictionValidator(res);
      if (isRestricted){ return response;}
    }

    if (!account) {
      return await CreateAndLoginNewStdAccount(res,student,userDetails,password,);
    }


    {
      const { isRestricted, response } =UserSpecificRestrictionValidator(account, res);
      if (isRestricted){ return response; }
    }

    const accountId = account._id; // Get the account ID after creation
    // Use the isPasswordCorrect method
    const isPasswordMatch = await account.isPasswordCorrect(password);
    if (!isPasswordMatch) {
      return res
       .status(401)
       .json({ success: false, message: "Invalid Credentials" });
    }

      const updateData = {
        isLogOutRequired: false,
        $addToSet: { logins: userDetails },
      };
      await Account.findByIdAndUpdate(account._id, updateData, { new: true });

      let tokenPayload = { accounts: [accountId], activeId: accountId };
      let otherAccounts = [account];
      if(decodedToken) {
        const accounts =  decodedToken.accounts.filter(id => id != accountId.toString()).concat(accountId)
        tokenPayload = {accounts,activeId:accountId };
        otherAccounts =await Account.find({_id:{$in:accounts}}).select("photo Name email");
      };

      let token = jwt.sign(tokenPayload,secretKey,{expiresIn: "30 days",});

      return res.cookie(cookieKey, token, {
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        .status(OK)
        .json({
          success: true,
          otherAccounts,
          message: "Logined Successfully",
          token: token,
          payload: account,
        });

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
    if (!decodedToken) return response;

    let user = await Account.findById(decodedToken.activeId).select("-password -LastLogin -OTP ");

    if (!user) {return res.status(401).json({ success: false, message: "Account verification failed" });  }

    req.details = user;
  
{
  const{isRestricted,response} = await StdGlobalRestrictionValidator(res); // Check the global Restriction
  if(isRestricted) return response

}

{
 const{isRestricted,response} = await StdIpValidator(req,res); // Check the ip missing possible cases
 if(isRestricted) return response
}

{
const {isRestricted,response} = UserSpecificRestrictionValidator(user,res); //Check the user specific restriction
if(isRestricted) return response
}

{
const {isRestricted,response} = isLogOutRequired(user,res); // isLogoutRequired
if(isRestricted) return response;
}

    

delete user.logins;
await Account.findByIdAndUpdate(decodedToken.activeId, {
LastLogin: new Date().toISOString(),
});
const otherAccounts = await Account.find({
_id: { $in: decodedToken.accounts },
}).select("photo Name email");

return res.json({
success: true,
message: "Verifed",
payload: user,
otherAccounts,
});

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function RequestPasswordChange(req, res) {
  const { gr } = req.body;
  try {
    const student = await Students.findOne({ GRNO: gr }).select("_id");
    if (!student) return res.status(401).json({ message: "Invalid GRNO" });
    const account = await Account.findOne({ Student: student._id }).select(
      "email username"
    );
    if (!account.email) {
      return res
        .status(401)
        .json({ status: "no-source", message: "Invalid GRNO" });
    }
{
const {isRestricted,response} = UserSpecificRestrictionValidator(account,res); //Check the user specific restriction
if(isRestricted) return response
}

{
  const{isRestricted,response} = await StdGlobalRestrictionValidator(res); // Check the global Restriction
  if(isRestricted) return response
}

    let OTP = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    await SendMail(account, OTP);
    await Account.findByIdAndUpdate(account._id, { OTP });
    const token = jwt.sign(
      { stdId: student._id },
      process.env.OTP_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.cookie(forgotKey, token, {
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });
    return res.json({
      token,
      success: true,
      message: `We have sent you an OTP on ${account.email}. `,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function VerifyOTP(req, res) {
  const { otp } = req.body;
  const token = req.header(forgotKey);
  const request_account_token =  req.header("token")

  if (request_account_token) {
    decodedToken   = HandleJWTToken(request_account_token, res).decodedToken;
 }

  const userDetails = await getExtensiveLoginInfo(req);
  if (!token) return res.status(401).json({ message: "Invalid Token" });
  let { decodedToken, response } = HandleJWTToken(
    token,
    res,
    process.env.OTP_TOKEN_SECRET
  );
  if (!decodedToken) return response;
  let account = await Account.findOne({ Student: decodedToken.stdId }).select("OTP");
  if (!account) return res.status(401).json({ message: "Invalid GRNO" });
  if (account.OTP != otp) {return res.status(401).json({ message: "Invalid OTP" });}
  const accountId= account._id;
  let otherAccounts =  []
  let tokenPayload = { accounts: [accountId], activeId: accountId };
  if(decodedToken) {
    const accounts =  decodedToken.accounts.filter(id => id != accountId.toString()).concat(accountId)
    tokenPayload={ accounts, activeId:accountId }
   otherAccounts =await Account.find({_id:{$in:accounts}}).select("photo Name email")
};

let login_token = jwt.sign(tokenPayload,secretKey,{expiresIn: "30 days",});

  account = await Account.findByIdAndUpdate(
    account._id,
    {
      OTP: null,
      isLogOutRequired: false,
      isSkipPassword: true,
      $addToSet: { logins: userDetails },
    },
    { $new: true }
  );
  res.cookie(cookieKey, login_token, {
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days
  });
  return res.json({
    success: true,
    payload: account,
    token: login_token,
    otherAccounts,
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
      return res.status(401).json({
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
    const userDetails = await getExtensiveLoginInfo(req);
    const account = await Account.findById(req.AdminId);
    const EncrpytedPassword = await bcrypt.hash(New, 10);
    const updatedLogins = account.logins.filter(
      (login) => login.ip === userDetails.ip
    );
    if (account.isSkipPassword) {
      await Account.findByIdAndUpdate(req.AdminId, {
        password: EncrpytedPassword,
        isSkipPassword: false,
        logins: updatedLogins,
        lastLogin: new Date().toISOString(),
      });
      return res.json({
        success: true,
        message: "Password Updated Successfully",
      });
    } else {
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

async function LogOut(req, res) {
  try {
    const userDetails = await getExtensiveLoginInfo(req);
    await Account.findByIdAndUpdate(req.AdminId, {
      $pull: { logins: { ip: userDetails.ip } },
    });
    const accounts = req.decodedToken.accounts.filter(id=>id!=req.decodedToken.activeId)
    if(accounts.length==0){
    return res.clearCookie(cookieKey, {
        secure: process.env.NODE_ENV === "production",
      }).json({ success: false, message: "Internal Server Error" });
    }
    else{
      const tokenPayload = { accounts, activeId: accounts[0] };
      let login_token = jwt.sign(tokenPayload, secretKey,{expiresIn: "30 days",});
      const activeAccountDetails = await Account.findById(accounts[0]).select("-LastLogin -createdAd -__v -isBlocked -isLogOutRequired");
      return res.cookie(cookieKey, login_token, {
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days
      }).json({ success: true, message: "Logged Out Successfully.",payload:activeAccountDetails });

    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function GetConnectedDevices(req, res) {
  try {
    const userDetails = await getExtensiveLoginInfo(req);
    const acc_details = await Account.findById(req.AdminId).lean();
    if (!acc_details) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const payload = acc_details.logins.map((e) => {
      return { ...e, isPrimary: e.ip == userDetails.ip };
    });
    return res.json({ success: true, payload });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function KickDevice(req, res) {
  const { password, deviceIp } = req.body;
  try {
    if (!password || !deviceIp) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient payload" });
    }
    const isMatchPassword = await bcrypt.compare(
      password,
      req.details.password
    );
    if (!isMatchPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }
    await Account.findByIdAndUpdate(req.AdminId, {
      $pull: { logins: { ip: ip } },
    });
    return res.json({ success: true, message: "Device Kicked Successfully." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}



async function SwitchAccount(req,res){
const {id} = req.body
try{

  if(!req.decodedToken.accounts.includes(id)){return res.status(401).json({message: "You don't have permission to switch account."})}
  
let tokenPayload = {accounts:req.decodedToken.accounts,activeId:id};
let otherAccounts =await Account.find({_id:{$in:req.decodedToken.accounts}}).select("photo Name email");
let token = jwt.sign(tokenPayload,secretKey,{expiresIn: "30 days",});
let account = await Account.findById(id).select("-isBlocked -isLogOutRequired -LastLogin -logins")
return res.cookie(cookieKey, token, {
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
.status(OK)
.json({
  success: true,
  otherAccounts,
  message: "Swithced",
  token: token,
  payload: account,
});
}
catch(err){
  console.log(err);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
}


}
module.exports = {
  LoginStudent,
  KickDevice,
  VerifyTokenStudent,
  RequestPasswordChange,
  VerifyOTP,
  ResetPhoto,
  ResetPublicInfo,
  CheckPasswordSkip,
  ResetPassword,
  LogOut,
  GetConnectedDevices,
  SwitchAccount
};
