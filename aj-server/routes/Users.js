const express = require("express");
const Authenticate = require("../middlewares/Authenticate.middleware");
const { getUsers, ToggleGlobalRestriction, ToggleBlockIndividualUser } = require("../controllers/Users.controller");
const router = express.Router();
router.get("/",Authenticate,getUsers)
router.put("/global/toggleRestriction",Authenticate,ToggleGlobalRestriction)
router.put("/Toggleblock",Authenticate,ToggleBlockIndividualUser)
module.exports = router;
