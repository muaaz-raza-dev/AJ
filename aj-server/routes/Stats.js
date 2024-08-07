const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { GeneralStats, MonthlyChartReport, DailyChartReport, FilterableConfigStats } = require('../controllers/Stats.controller');
const router = express.Router();

// Define your routes here
router.get("/",Authenticate,GeneralStats)
router.post("/monthly/revenue/report",Authenticate,MonthlyChartReport)
router.post("/daily/revenue/report",Authenticate,DailyChartReport)
router.post("/advanced",Authenticate,FilterableConfigStats)


module.exports = router;
