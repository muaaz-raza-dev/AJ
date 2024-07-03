
const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const {ValidateUserName,RegsiterMember, ReadTeachers_short, ReadTeachers_detailed, ReadTeachers_Filtered, FetchTeachers_Names} =require("../controllers/Teacher.controller");
const { ClassRegisteration, Read_all_Classes, Read_Class_details } = require('../controllers/Classes.controller');
const router = express.Router();


//? Teachers
router.post("/teacher_registeration",Authenticate,RegsiterMember)
router.get("/teachers",Authenticate,ReadTeachers_short)
router.post("/teachers/filtered",Authenticate,ReadTeachers_Filtered)
router.get("/teacher/:id",Authenticate,ReadTeachers_detailed)
router.get("/teachers/all",Authenticate,FetchTeachers_Names)
router.get("/validate_username/:username",Authenticate,ValidateUserName) 

//?Classes 
router.post("/class/register",Authenticate,ClassRegisteration) 
router.get("/classes/",Authenticate ,Read_all_Classes )
router.get("/classes/:id",Authenticate , Read_Class_details)

module.exports = router