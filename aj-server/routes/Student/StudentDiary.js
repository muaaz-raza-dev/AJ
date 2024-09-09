const express = require("express");
const { getDiaries, ReadDiary } = require("../../controllers/Students/StudentDiary.controller");

const router = express.Router()

router.post("/",getDiaries)
router.get("/d/:id",ReadDiary)


module.exports = router;