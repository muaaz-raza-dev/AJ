// Start Generation Here
const express = require("express");
const {
  getShallowTransactionList,
  getDetailedInvoice,
  getDuesShallowDetails,
  getLastTransactionShallowDetails,
  getRecentFeeStatus,
  getFeeRecordFilters,
  getFeeRecords,
  getOneTimeFeeRecord,
  getTransactionHistory,
  getTransactionHistoryYears
} = require("../../controllers/Students/StudentTransactions.controller");
const router = express.Router();

// Define your routes here
router.get("/list", getShallowTransactionList);
router.get("/:Invoice", getDetailedInvoice);

router.get("/dues/shallow", getDuesShallowDetails);
router.get("/last/shallow", getLastTransactionShallowDetails);
router.get("/recent/shallow",getRecentFeeStatus );

router.get("/records/filters", getFeeRecordFilters);
router.get("/records/oneTime", getOneTimeFeeRecord);
router.post("/records", getFeeRecords);


router.get("/history/years", getTransactionHistoryYears);
router.post("/history", getTransactionHistory);

module.exports = router;
