
const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const {ValidateUserName,RegsiterMember} =require("../controllers/Teacher.controller")
const router = express.Router();

router.post("/teacher_registeration",Authenticate,RegsiterMember) 
router.get("/validate_username/:username",Authenticate,ValidateUserName) 
module.exports = router