const express = require("express");
const { FetchStudentInfo } = require("../../controllers/Students/StudentInfo.controller");
const { ValidateOwnerShipStd } = require("../../middlewares/ValidateOwnInfo.middleware");
const router = express.Router();

// Define your routes here
router.get("/:id", ValidateOwnerShipStd,FetchStudentInfo);

// Export the router
module.exports = router;
