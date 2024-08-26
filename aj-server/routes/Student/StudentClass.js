const express = require('express');
const { getStdClassDetails } = require('../../controllers/Students/StudentClassInfo.controller');
const router = express.Router();

// Define your routes here
router.get('/my', getStdClassDetails);

module.exports = router;
