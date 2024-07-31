
const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { RegisterPayment, GetSessions, GetConfigs, FetchConfigDetails, UpdateConfig ,FetchConfigAllDetails } = require('../controllers/SchoolPayment.controller');
const router =express.Router()

router.post("/register",Authenticate, RegisterPayment)
router.get("/sessions",Authenticate,GetSessions)
router.post("/configs",Authenticate,GetConfigs)
router.get("/:id" , Authenticate, FetchConfigAllDetails)
router.get("/get/:id",Authenticate,FetchConfigDetails)
router.put("/update",Authenticate,UpdateConfig)
module.exports = router
