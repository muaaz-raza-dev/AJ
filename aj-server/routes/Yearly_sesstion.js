
const express = require("express");
const Authenticate = require("../middlewares/Authenticate.middleware");
const { RegisterSession, ReadSessions ,ReadSession, UpdateSession} = require("../controllers/Sessions.controller");
const router = express.Router()
router.post("/register",Authenticate,RegisterSession)
router.get("/",Authenticate,ReadSessions)
router.get("/:id",Authenticate,ReadSession)
router.put("/update",Authenticate,UpdateSession)
module.exports = router