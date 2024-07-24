const express = require('express');
const { ReadStudents,SearchStudents,FilterStudents} = require('../controllers/Students.controller');
const Authenticate  = require('../middlewares/Authenticate.middleware');
const router = express.Router();
// Write your routes here
router.post("/",Authenticate,ReadStudents)
router.post("/search",Authenticate,SearchStudents)
router.post("/filters",Authenticate,FilterStudents)

module.exports = router;