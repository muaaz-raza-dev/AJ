const express = require('express');
const router = express.Router();
const {GRValidation,RegisterStudent} = require("../controllers/StudentsRegisteration.controller");
const  Authenticate  = require('../middlewares/Authenticate');
// Write your routes here
router.post("/grValidation",Authenticate,GRValidation)
router.post("/register",Authenticate,RegisterStudent)

module.exports = router;