
const moment = require("moment");
const Account = require("../../../../models/StdAcconts");
let secretKey = process.env.jwt_Secret;
const cookieKey = process.env.STD_COOKIE_KEY;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function CreateAndLoginNewStdAccount(res,student,userDetails,password,isConcurrent=false) {
    try {

        if (!student.DOB) {
            return res
          .status(401)
          .json({ message: "Contact admin to release your account." });
        }
        const DOBasPassword = moment(student.DOB, "YYYY-MM-DD").format("DDMMYYYY").trim();
      const newPassword = await bcrypt.hash(DOBasPassword, 10);
      const account = await Account.create({
        Student: student._id,
        Name: student.FirstName,
        email: student.email,
        photo: student.photo,
        password: newPassword,
    });
    const accountId = account._id ; // Get the account ID after creation
  
      
      if (password == moment(student.DOB, "YYYY-MM-DD").format("DDMMYYYY")) {
        await Account.findByIdAndUpdate(accountId, {$addToSet: { logins: userDetails },});
        let tokenInput = {accounts:[accountId] ,activeId: accountId}
        if(isConcurrent) {tokenInput={accounts:[...req.decodedToken.accounts,accountId],activeId:accountId}}

        let token = jwt.sign(tokenInput, secretKey, {
            expiresIn: "30 days",
        });

        return res
          .cookie(cookieKey, token, {
            secure: process.env.NODE_ENV === "production",
            // domain:".ajfoundation.site",
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
      else{
          return res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to register student",
            error: err.message,
        });
    }
    }

    module.exports = {CreateAndLoginNewStdAccount}
    