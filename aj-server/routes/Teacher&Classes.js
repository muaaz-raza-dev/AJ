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
  FetchClassBasedPaymentConfigInfo,
  UpdateClassBasedPaymentConfig,
} = require("../controllers/Classes.controller");
const { AuthenticateRole } = require("../middlewares/AuthenticateRole.middleware");
const router = express.Router();

//? Teachers
router.post("/teacher_registeration", Authenticate,AuthenticateRole("chief admin"), RegsiterMember);
router.get("/teachers", Authenticate,AuthenticateRole("chief admin"), ReadTeachers_short);
router.post("/teachers/filtered", Authenticate,AuthenticateRole("chief admin"), ReadTeachers_Filtered);
router.get("/teacher/:id", Authenticate,AuthenticateRole("chief admin"), ReadTeachers_detailed);
router.post("/validate/username", Authenticate, ValidateUserName);
router.put("/teacher/edit",Authenticate,AuthenticateRole("chief admin"),EditMember_Admin)
router.get("/teacher/raw/:id",Authenticate,FetchTeacherRaw)
router.get("/staff/raw/:id",Authenticate,FetchStaffRaw)
router.put("/reset/photo/",Authenticate,EditMember_Personal_Photo)
router.put("/update/mutableInfo/personal",Authenticate,UpdateInfo_Personal)

//?Classes
router.get("/class/required/:type", Authenticate, FetchRequiredInformation_Class);
router.get("/class/raw/:id" , Authenticate , FetchClassInformation_Raw)
router.post("/classes/filtered", Authenticate, Filter_Read_Classes);
//Create
router.post("/class/register", Authenticate, ClassRegisteration);
//update
router.post("/class/edit", Authenticate,AuthenticateRole("chief admin"), Edit_Class);

router.get("/classes/", Authenticate, Read_all_Classes);
router.get("/class/:id", Authenticate, Read_Class_details);
// ClassBased Payment Config Info
router.get("/paymentConfigs/:id",Authenticate,AuthenticateRole("chief admin"),FetchClassBasedPaymentConfigInfo)
router.put("/class/paymentConfigs",Authenticate,AuthenticateRole("chief admin"),UpdateClassBasedPaymentConfig)

module.exports = router;
