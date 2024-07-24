
const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { InitialHistoryData, GetPaymentHistory,GetDuesHistory} = require('../controllers/StudentHistroy.controller');
const router =express.Router()

router.get("/meta/:id",Authenticate,InitialHistoryData)
router.post("/get",Authenticate,GetPaymentHistory)
router.post("/dues",Authenticate,GetDuesHistory)

module.exports = router
