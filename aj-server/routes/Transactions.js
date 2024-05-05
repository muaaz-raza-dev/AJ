const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { CreateTransaction, SearchStudent, ReadTransactionsMeta, ReadTransactions, SetTransactionConfig } = require('../controllers/Transactions.controller');
const router = express.Router();
router.post("/",Authenticate,CreateTransaction)
router.post("/read",Authenticate,ReadTransactions)
router.get("/meta",Authenticate,ReadTransactionsMeta)
router.post("/search/std",Authenticate,SearchStudent)
router.post("/config",Authenticate,SetTransactionConfig)


module.exports = router;
