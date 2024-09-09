const express = require('express');
const { LoginStudent, VerifyTokenStudent, RequestPasswordChange, VerifyOTP, ResetPhoto, ResetPublicInfo, CheckPasswordSkip, ResetPassword, LogOut, GetConnectedDevices, KickDevice, SwitchAccount } = require('../../controllers/Students/StudentAuth.controller');
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
//* Log Out
router.post("/logout",AuthenticateStudents,LogOut) 

router.put("/photo",AuthenticateStudents,ResetPhoto)
router.put("/reset/public",AuthenticateStudents,ResetPublicInfo)
router.post("/password/skip",AuthenticateStudents,CheckPasswordSkip)
router.put("/reset/password",AuthenticateStudents,ResetPassword)
router.get("/connected/devices",AuthenticateStudents,GetConnectedDevices)
router.put("/kick/device",AuthenticateStudents,KickDevice)

router.post("/switch",AuthenticateStudents,SwitchAccount) 
module.exports = router;