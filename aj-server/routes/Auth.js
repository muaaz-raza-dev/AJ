const express = require('express');
const router = express.Router();
const {LoginController,VerificationController, GetAccountInfo, ResetCredentials} = require("../controllers/Auth.controller");
const Authenticate = require('../middlewares/Authenticate.middleware');
// Write your routes here
router.post("/login",LoginController)
router.get("/authenticate",VerificationController)
router.get("/info",Authenticate,GetAccountInfo)
router.put("/update",Authenticate,ResetCredentials)
module.exports = router;
