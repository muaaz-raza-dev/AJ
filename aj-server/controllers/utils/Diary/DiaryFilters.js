const { redis } = require("../../../db")
const Class = require("../../../models/Class")
const Sections_Class = require("../../../models/Sections_Class")
const Session = require("../../../models/Session")

const DiaryFilters= async ()=>{
    let payload = await redis?.get("global-filters")
    if(payload) return  JSON.parse(payload)

    
    let Sessions = await Session.find().sort("-start_date")
    let Classes = await Class.find({SessionId:{$in:Sessions.map(se=>se._id)}})
    let Sections  =await Sections_Class.find({Class:{$in:Classes.map(e=>e?._id)}})

    let classes =  {} // { ClassId:Class name}
    let sections = {} // Class : {Section_Id :Section name}
    let sessions = {} // SessionId :Session name
    Sessions.forEach((e,)=>{
        sessions[e?._id] = e?.acedmic_year
    })
    
    Classes.forEach((e)=>{
        if(!classes[e.SessionId]) classes[e.SessionId]={ }
        classes[e.SessionId][e?._id] = e?.name
    })

    Sections.forEach((e)=>{
    if(!sections[e?.Class]) sections[e?.Class] = {}
        sections[e?.Class][e?._id] = e?.name
    })


    payload = {classes , sessions , sections }

    await redis?.set("global-filters", JSON.stringify(payload),'EX' ,60*3) //? cache for 3 minute
    return payload
}

module.exports = DiaryFilters;