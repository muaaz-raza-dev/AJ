const moment = require("moment");
const Class = require("../models/Class");
const Session = require("../models/Session");
const Sections_Class = require("../models/Sections_Class");

    async function LoadGlobalValues  (req,res){
        try {
            let currentSession = await Session.findOne({isActive:true}).select("_id")
            let sessions = await Session.find()
            let classes = await Class.find({SessionId:currentSession?._id})
            let sections  =await Sections_Class.find({Class:{$in:classes.map(e=>e?._id)}})
            let Classes =  {} // { ClassId:Class name}
            let Sections = {} // Class : {Section_Id :Section name}
            let Sessions = {} // SessionId :Session name
            sessions.forEach((e,)=>{
                Sessions[e?._id] = e?.session_name+" "+e?.acedmic_year
            })
            sections.forEach((e)=>{
                if(Sections[e?.Class])Sections[e?.Class] = {}
                Sections[e?.Class]={[e?._id]:e?.name} 
            })
            classes.forEach((e)=>{
                Classes[e?._id] = e?.name ;
            })

            res.json({success:true,Classes , Sessions , Sections})
        }
        catch (err){
        res.status(500).json({success:false, message:"Nothing is registered yet.", error: err.message});
        }
        }
    module.exports = {LoadGlobalValues}