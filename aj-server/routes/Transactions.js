const express = require('express');
const Authenticate = require('../middlewares/Authenticate');
const { CreateTransaction, SearchStudent, ReadTransactionsMeta } = require('../controllers/Transactions.controller');
const router = express.Router();
router.post("/",Authenticate,CreateTransaction)
router.get("/meta",Authenticate,ReadTransactionsMeta)
router.post("/search/std",Authenticate,SearchStudent)


module.exports = router;
