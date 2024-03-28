const express = require('express');
const router = express.Router();
const {LoginController,VerificationController} = require("../controllers/Auth.controller")
// Write your routes here
router.post("/login",LoginController)
router.get("/authenticate",VerificationController)

module.exports = router;
