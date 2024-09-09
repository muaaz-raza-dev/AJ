const lod = require("lodash")
const moment = require("moment");
const Respond = require("../Helpers/ResponseHandler");
const Diary = require("../models/Diary");
const DiaryFilters = require("./utils/Diary/DiaryFilters");
const deleteCloudinaryImages = require("../Helpers/deleteCloudinaryImages");

const uploadDiary = async (req, res) => {
  try {
    const { payload } = req.body; // payload.classes = {class:classId, sections:sectionsIds[]}
    const sections = payload.classes.reduce(
      (acc, cl) => acc.concat(cl.sections),
      []
    );
    delete payload.classes;
    payload.sections = sections;
    payload.publishedBy = req.AdminId;
    const diaryEntry = new Diary(payload);
    await diaryEntry.save();
    return Respond({
      res,
      payload,
      success: true,
      message: "Diary uploaded successfully!",
    });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};

const DiaryFiltersMetaData = async (req, res) => {
  try {
    let payload = await DiaryFilters();
    const defaultSession = Object.keys(payload.sessions)[0];
    const defaultClass = Object.keys(payload.classes[defaultSession])[0];
    const defaultState = {
      session: defaultSession,
      Class: defaultClass,
      section: Object.keys(payload.sections[defaultClass])[0],
    };
    return Respond({ res, payload: { filters: payload, defaultState } });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};

const ReadDiaries = async (req, res) => {
  try {
    const { section, date } = req.body;
    const startOfDay = moment(date, "YYYY-MM-DD").startOf("day").toDate();
    const endOfDay = moment(date, "YYYY-MM-DD")
      .add(1, "day")
      .startOf("day")
      .toDate();
    const diaries = await Diary.find({
      sections: section,
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate({ path: "publishedBy", select: "Name" }).select("-sections");

    return Respond({ res, payload: diaries });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};

const ReadDetailedDiary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id||id.length!=24) return Respond({ res, success: false, message: "Diary id is required" });
    const diary = await Diary.findById(id).populate({
      path: "publishedBy",
      select: "Name",
    }).populate({path:"sections",select:"Class name",populate:{path:"Class",select:"name"}})
    .populate({path:"seenBy",select:"FirstName LastName photo GRNO"}).lean();
    if (!diary) return Respond({ res, success: false, message: "Diary not found" });
    let payload = JSON.parse(JSON.stringify(diary))
    payload.sections = payload.sections.map(s=>{
        return {...s,Class:s.Class.name}
    })
    payload.sections = lod.groupBy(payload.sections,({Class})=>Class)
    return Respond({ res, payload });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};

const DeleteDiary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id||id.length!=24) return Respond({ res, success: false, message: "Diary id is required" });
    const diary = await Diary.findById(id)
    if (!diary) return Respond({ res, success: false, message: "Diary not found" });
    await deleteCloudinaryImages(diary.images)
    await Diary.findByIdAndDelete(id)
    return Respond({ res, success: true, message: "Diary deleted successfully!" });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};


const RequestEditDiary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id||id.length!=24) return Respond({ res, success: false, message: "Diary id is required" });
    const diary = await Diary.findById(id).select("-publishedBy").populate("sections")
    if (!diary) return Respond({ res, success: false, message: "Diary not found" });
    const Payload = JSON.parse(JSON.stringify(diary));
    const ClassBased =lod.groupBy(Payload.sections,({Class})=>Class)
   Payload.classes = Object.entries(ClassBased).map(e=>{
      return {class:e[0],sections:e[1].map(sec=>sec._id)}
    })
    Payload.date = moment(diary.date).format("YYYY-MM-DD")
    return Respond({ res, success: true,payload:Payload});
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
};

const EditDiary = async(req,res)=>{
  try{
  const {payload} = req.body;
  const {id} = req.params;
  if (!id||id.length!=24) return Respond({ res, success: false, message: "Diary id is required" });
  const diary = await Diary.findById(id);
  if (!diary) return Respond({ res, success: false, message: "Diary not found" });
  delete payload.publishedBy;
  payload.sections = payload.classes.reduce((acc, cl) => acc.concat(cl.sections), []);
  delete payload.classes;
  payload.date = moment(payload.date, "YYYY-MM-DD").toDate();
  payload.seenBy = [];
  delete payload._id
  await Diary.findByIdAndUpdate(id,payload)
  return Respond({ res, success: true, message: "Diary edited successfully!" });
  } catch (err) {
    console.log(err);
    return Respond({
      res,
      success: false,
      message: "An error occured. Try again.",
      status: 501,
      error: err,
    });
  }
}

module.exports = { uploadDiary, DiaryFiltersMetaData, ReadDiaries,ReadDetailedDiary,DeleteDiary,RequestEditDiary,EditDiary};
