const moment = require("moment");
const Respond = require("../Helpers/ResponseHandler");
const Diary = require("../models/Diary");
const DiaryFilters = require("./utils/Diary/DiaryFilters");
const CalculateAllStatFilters = require("./utils/Stats/FilteredData/CalculateAllStatFilters");

const uploadDiary= async(req,res)=>{
    try{
        const {payload} =req.body; // payload.classes = {class:classId,sections:sectionsIds[]}
        const sections = payload.classes.flatMap(cl => cl.sections);
        delete payload.classes;
        payload.sections = sections;
        console.log(payload.sections)
        await Diary.create({...payload,publishedBy:req.AdminId})
        return Respond({res,payload,success:true,message:"Diary uploaded successfully!"})
    }
    catch(err){
        console.log(err)
     return   Respond({res,success:false,message:"An error occured. Try again.", status:501, error:err})
    }
}

const DiaryFiltersMetaData = async(req,res)=>{
    try{
        let payload = await DiaryFilters();
        const defaultSession = Object.keys(payload.sessions)[0]
        const defaultClass = Object.keys(payload.classes[defaultSession])[0]
        const defaultState = {session:defaultSession,Class:defaultClass,
            section:Object.keys(payload.sections[defaultClass])[0]
        }
        return Respond({res,payload:{filters:payload,defaultState}})
    }
    catch(err){
        console.log(err)
     return   Respond({res,success:false,message:"An error occured. Try again.", status:501, error:err})
    }
}

const ReadDiaries = async(req,res)=>{
    try{
        const {section,date} = req.body;
        const startOfDay = moment(date,"YYYY-MM-DD").startOf('day').toDate();
        const endOfDay = moment(date,"YYYY-MM-DD").add(1, 'day').startOf('day').toDate();
        const diaries = await Diary.find({ sections: section, date:{$gt:startOfDay,$lt:endOfDay} }).populate({path:"publishedBy",select:"Name"});

        return Respond({res,payload:diaries})
    }
    catch(err){
        console.log(err)
     return   Respond({res,success:false,message:"An error occured. Try again.", status:501, error:err})
    }
}
module.exports = {uploadDiary,DiaryFiltersMetaData,ReadDiaries}