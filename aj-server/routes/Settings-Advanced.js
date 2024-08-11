const express = require("express");
const router = express.Router();
const Authenticate = require("../middlewares/Authenticate.middleware");
const { AuthenticateRole } = require("../middlewares/AuthenticateRole.middleware");
const { GetGlobalConfigs, UpdateGlobalConfigs, SortGRStudentsAction } = require("../controllers/AdvancedSettings.controller");

// Import necessary controllers and middleware


router.route("/")
.get(Authenticate, AuthenticateRole("chief admin"), GetGlobalConfigs)
.put(Authenticate, AuthenticateRole("chief admin"), UpdateGlobalConfigs);
router.put("/sort/grno",Authenticate,AuthenticateRole("chief admin"),SortGRStudentsAction)
module.exports = router;
