const express = require('express');
const router = express.Router();
const {GRValidation,RegisterStudent, AutoGR} = require("../controllers/StudentsRegisteration.controller");
const  Authenticate  = require('../middlewares/Authenticate.middleware');
// Write your routes here
router.post("/grValidation",Authenticate,GRValidation)
router.post("/register",Authenticate,RegisterStudent)
router.get("/autoGR",Authenticate,AutoGR)

module.exports = router;