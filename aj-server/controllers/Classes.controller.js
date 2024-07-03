const Respond = require("../Helpers/ResponseHandler")
const Class = require("../models/Class")
const Sections_Class = require("../models/Sections_Class")



const SectionRegisteration = async (sections)=>{
    try{
        let new_sections = []
        console.log(sections);
        await Promise.all(sections.map(async section=>{
            let newSection = await Sections_Class.create(section)
            new_sections.push(newSection._doc._id)
        }))
        return new_sections
    }
    catch(err){
        console.log(err)
        return false
    }
}

const ClassRegisteration =async (req,res)=> {
let {payload} =req.body
try{
    let Class_exist = await Class.findOne({Class:payload.name})
    if(!Class_exist){
        let sections = payload.sections
        delete payload.sections
        let newClass =await  Class.create(payload)
        let Sections = sections.map(section=>({...section,Class:newClass._doc._id}))
        let section_response = await SectionRegisteration(Sections)  
        if(section_response){
             let updatedClass = await Class.findByIdAndUpdate(newClass._doc._id ,{sections:section_response})
             Respond({res,success:true,message:"Class Created",status:201 ,payload:newClass})
            }
            else Respond({res,success:false,message:"Something went wrong,try again later!",status:401 })
    }
    else Respond({res,success:false,message:"Class already exists",status:501 })
}
catch(err){
    console.log(err)
    Respond({res,success:false,message:"Something went wrong,try again later!",status:401 })
}
}





const Read_all_Classes = async(req,res)=>{
    try{
        let Classes = await Class.find().populate({populate:"sections" , }).select(" name sections.ClassTeacher.firstName sections.Students  subjects  ")
        Respond({res,success:true,message:"Classes fetched",status:200,payload:Classes})
    }
    catch(err){
        Respond({res,success:false,message:"Something went wrong,try again later!",status:401 })
    }
}




const Read_Class_details = async(req,res)=>{
    let {id} = req.params
    try{
        let Classes = await Class.findById(id).populate("sections sections.ClassTeacher ").select(" name sections.ClassTeacher.firstName sections.Students  subjects  ")
        Respond({res,success:true,message:"Classes fetched",status:200,payload:Classes})
    }
    catch(err){
        Respond({res,success:false,message:"Something went wrong,try again later!",status:401 })
    }   
}




module.exports = {ClassRegisteration,Read_all_Classes ,Read_Class_details}