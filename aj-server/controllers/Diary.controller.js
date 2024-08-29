const Respond = require("../Helpers/ResponseHandler");
const Diary = require("../models/Diary");

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

module.exports = {uploadDiary}