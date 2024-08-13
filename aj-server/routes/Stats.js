const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { GeneralStats, MonthlyChartReport, DailyChartReport, FilterableConfigStats } = require('../controllers/Stats.controller');
const Report= require('../controllers/StdFeeReport.controller');
const router = express.Router();

// Define your routes here
router.get("/",Authenticate,GeneralStats)
router.post("/monthly/revenue/report",Authenticate,MonthlyChartReport)
router.post("/daily/revenue/report",Authenticate,DailyChartReport)
router.post("/advanced",Authenticate,FilterableConfigStats)

//* Report routes *//
//? Get the all the student which either pay the selected fee or not based on filters

// meta i.e filters
router.get("/report/std/meta",Authenticate,Report.GetStudentFeeReportFilters)
router.post("/report/std",Authenticate,Report.GetStudentFeeReport)


module.exports = router;
