const express = require('express');
const { LoginStudent, VerifyTokenStudent, RequestPasswordChange, VerifyOTP, ResetPhoto, ResetPublicInfo, CheckPasswordSkip, ResetPassword } = require('../../controllers/StudentAuth.controller');
const AuthenticateStudents = require('../../middlewares/AuthenticateStudents.middleware');
const router =express.Router()

//* login method 1
router.post("/login",LoginStudent) 
//* login method 2
router.post("/otp/verify",VerifyOTP) 
//* verify token for authentication
router.get("/",VerifyTokenStudent)
//* request password change
router.post("/otp",RequestPasswordChange)
//* request password change

router.put("/photo",AuthenticateStudents,ResetPhoto)
router.put("/reset/public",AuthenticateStudents,ResetPublicInfo)
router.post("/password/skip",AuthenticateStudents,CheckPasswordSkip)
router.put("/reset/password",AuthenticateStudents,ResetPassword)

module.exports = router;