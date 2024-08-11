const express = require("express");
const Authenticate = require("../middlewares/Authenticate.middleware");
const { getUsers, ToggleGlobalRestriction, ToggleBlockIndividualUser, CreateUserAccount, GetUserInfo, UpdateUserInfo, DeleteUserAccount }
 = require("../controllers/Users.controller");
const { AuthenticateRole } = require("../middlewares/AuthenticateRole.middleware");
const router = express.Router();
router.get("/",Authenticate,getUsers)
router.put("/global/toggleRestriction",Authenticate,ToggleGlobalRestriction)
router.put("/Toggleblock",Authenticate,ToggleBlockIndividualUser)
router.post("/create",Authenticate,AuthenticateRole("chief admin"),CreateUserAccount)
router.get("/:id",Authenticate,AuthenticateRole("chief admin"),GetUserInfo)
router.put("/:id",Authenticate,AuthenticateRole("chief admin"),UpdateUserInfo)
router.delete("/:id",Authenticate,AuthenticateRole("chief admin"),DeleteUserAccount)
module.exports = router;
