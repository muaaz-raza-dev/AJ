const express = require("express");
const { uploadDiary, DiaryFiltersMetaData, ReadDiaries, ReadDetailedDiary, DeleteDiary, RequestEditDiary, EditDiary } = require("../controllers/Diary.controller");

const router = express.Router();

router.post("/upload", uploadDiary);
router.get("/meta", DiaryFiltersMetaData);
router.post("/", ReadDiaries);
router.get("/:id", ReadDetailedDiary);
router.delete("/:id",DeleteDiary);
router.route("/edit/:id")
  .get(RequestEditDiary) // For GET request
  .put(EditDiary); // For PUT request

module.exports = router;
