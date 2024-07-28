const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { GeneralStats, MonthlyChartReport, DailyChartReport } = require('../controllers/Stats.controller');
const router = express.Router();

// Define your routes here
router.get("/",Authenticate,GeneralStats)
router.post("/monthly/revenue/report",Authenticate,MonthlyChartReport)
router.post("/daily/revenue/report",Authenticate,DailyChartReport)


module.exports = router;
