const express = require("express");
const {
  StudentOverview,
  StudentFeesDetails,
  StudentInformationExclusive,
  EditStudent,
} = require("../controllers/ReadStudentsExclusive.controller");
const Authenticate = require("../middlewares/Authenticate.middleware");
const router = express.Router();
router.get("/:GRNO", Authenticate, StudentOverview);
router.get("/Fees/:GRNO/:FeeType/:Year", Authenticate, StudentFeesDetails);
router.route("/Info/:GRNO")
  .get(Authenticate, StudentInformationExclusive)
  .post(Authenticate, EditStudent);
module.exports = router;
