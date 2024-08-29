const express = require("express");
const { uploadDiary, DiaryFiltersMetaData, ReadDiaries } = require("../controllers/Diary.controller");

const router = express.Router();

router.post("/upload", uploadDiary);
router.get("/meta", DiaryFiltersMetaData);
router.post("/", ReadDiaries);

module.exports = router;
