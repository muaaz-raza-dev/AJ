const express = require("express");
const { uploadDiary } = require("../controllers/Diary.controller");

const router = express.Router();

router.post("/upload", uploadDiary);

module.exports = router;
