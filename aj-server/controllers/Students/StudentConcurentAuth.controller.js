const bcrypt = require("bcryptjs");
const Account = require("../../models/StdAcconts");
const Students = require("../../models/Students");

let secretKey = process.env.jwt_Secret;
const cookieKey = process.env.STD_COOKIE_KEY;

const {
  CreateAndLoginNewStdAccount,
} = require("./utils/auth/CreateAndLoginNewStdAccount");
async function LoginOtherAccount(req, res) {
  const { GRNO, password } = req.body;
  const userDetails = await getExtensiveLoginInfo(req);
  const student = await Students.findOne({ GRNO }).select(
    "_id FirstName photo email DOB"
  );
  if (!student) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  let account = await Account.findOne({ Student: student._id });
  {
    const { isRestricted, response } = await GlobalRestrictionValidator(res);
    if (isRestricted){ return response;}
  }

  if (!account) {
    return await CreateAndLoginNewStdAccount(res,student,userDetails,password,true);
  }


  {
    const { isRestricted, response } =UserSpecificRestrictionValidator(account, res);
    if (isRestricted){ return response; }
  }


  

  const isPasswordMatch = await bcrypt.compare(account.password, password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  } else {
    const token = jwt.sign(
      {
        accounts: [...req.decodedToken.accounts, accountId],
        activeId: accountId,
      },
      secretKey,
      {
        expiresIn: "30 days",
      }
    );

    const updateData = {
      isLogOutRequired: false,
      $addToSet: { logins: userDetails },
    };
    account = await Account.findByIdAndUpdate(account._id, updateData, {
      new: true,
    });

    return res
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
  }
}

module.exports = { LoginOtherAccount };
