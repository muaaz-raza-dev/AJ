
const express = require("express");
const Authenticate = require("../middlewares/Authenticate.middleware");
const { RegisterSession, ReadSessions } = require("../controllers/Sessions.controller");
const router = express.Router()
router.post("/register",Authenticate,RegisterSession)
router.get("/",Authenticate,ReadSessions)
module.exports = router