const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { CreateTransaction, SearchStudent, ReadTransactionsMeta, ReadTransactions, SetTransactionConfig, getDetailedTransactions,  CancelnRestoreTransaction } = require('../controllers/Transactions.controller');
const router = express.Router();
router.post("/",Authenticate,CreateTransaction)
router.post("/read",Authenticate,ReadTransactions)
router.get("/meta",Authenticate,ReadTransactionsMeta)
router.get("/:id",Authenticate,getDetailedTransactions)
router.put("/cancel/:id",Authenticate,CancelnRestoreTransaction)
router.post("/search/std",Authenticate,SearchStudent)
router.post("/config",Authenticate,SetTransactionConfig)


module.exports = router;
