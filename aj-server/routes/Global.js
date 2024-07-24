const express = require('express');
const router = express.Router();
const  Authenticate  = require('../middlewares/Authenticate.middleware');
const { LoadGlobalValues } = require('../controllers/Global.controller');
// Write your routes here
router.get("/",Authenticate,LoadGlobalValues)
module.exports = router;

