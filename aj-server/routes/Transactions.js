const express = require('express');
const Authenticate = require('../middlewares/Authenticate.middleware');
const { CreateTransaction, SearchStudent, ReadTransactionsMeta, ReadTransactions, SetTransactionConfig, getDetailedTransactions,  CancelnRestoreTransaction, fetchRawTransactionDetails, editTransaction } = require('../controllers/Transactions.controller');
const { AuthenticateRole } = require('../middlewares/AuthenticateRole.middleware');
const router = express.Router();
router.post("/",Authenticate,CreateTransaction)
router.post("/read",Authenticate,ReadTransactions)
router.get("/meta",Authenticate,ReadTransactionsMeta)
router.get("/:id",Authenticate,getDetailedTransactions)
router.put("/cancel/:id",Authenticate,CancelnRestoreTransaction)
router.post("/search/std",Authenticate,SearchStudent)
router.get("/raw/:invoice",Authenticate,fetchRawTransactionDetails)
router.post("/edit/:invoice",Authenticate,fetchRawTransactionDetails)
router.post("/config",Authenticate,SetTransactionConfig)

router.put("/update",Authenticate,AuthenticateRole("chief admin"),editTransaction)



module.exports = router;
