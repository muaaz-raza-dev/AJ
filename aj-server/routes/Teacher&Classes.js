const express = require("express");
const Authenticate = require("../middlewares/Authenticate.middleware");
const {
  ValidateUserName,
  RegsiterMember,
  ReadTeachers_short,
  ReadTeachers_detailed,
  ReadTeachers_Filtered,
  FetchRequiredInformation_Class,
  EditMember_Admin,
  FetchTeacherRaw,
  FetchStaffRaw,
  EditMember_Personal_Photo,
  UpdateInfo_Personal
} = require("../controllers/Teacher.controller");
const {
  ClassRegisteration,
  Read_all_Classes,
  Read_Class_details,
  Filter_Read_Classes,
  Edit_Class,
  FetchClassInformation_Raw,
} = require("../controllers/Classes.controller");
const router = express.Router();

//? Teachers
router.post("/teacher_registeration", Authenticate, RegsiterMember);
router.get("/teachers", Authenticate, ReadTeachers_short);
router.post("/teachers/filtered", Authenticate, ReadTeachers_Filtered);
router.get("/teacher/:id", Authenticate, ReadTeachers_detailed);
router.post("/validate/username", Authenticate, ValidateUserName);
router.put("/teacher/edit",Authenticate,EditMember_Admin)
router.get("/teacher/raw/:id",Authenticate,FetchTeacherRaw)
router.get("/staff/raw/:id",Authenticate,FetchStaffRaw)
router.put("/reset/photo/",Authenticate,EditMember_Personal_Photo)
router.put("/update/mutableInfo/personal",Authenticate,UpdateInfo_Personal)

//?Classes
router.get("/class/required", Authenticate, FetchRequiredInformation_Class);
router.get("/class/raw/:id" , Authenticate , FetchClassInformation_Raw)
router.post("/classes/filtered", Authenticate, Filter_Read_Classes);
//Create
router.post("/class/register", Authenticate, ClassRegisteration);
//update
router.post("/class/edit", Authenticate, Edit_Class);

router.get("/classes/", Authenticate, Read_all_Classes);
router.get("/class/:id", Authenticate, Read_Class_details);

module.exports = router;
