const { redis } = require("../db");
const Respond = require("../Helpers/ResponseHandler");
const Class = require("../models/Class");
const OneTimeFee = require("../models/OneTimeFee");
const PaymentConfig = require("../models/PaymentConfigs");
const Sections_Class = require("../models/Sections_Class");
const Session = require("../models/Session");
const PaymentConfigClassValidator = require("./utils/Classes/PaymentConfigClassValidator.utils");
const ReadPaymentConfigsBasedonClass = require("./utils/Classes/ReadPaymentConfigsBasedonClass.utils");
const SetupPaymentConfigAuto = require("./utils/Classes/SetupPaymentConfigAuto.utils");
const  OptimizeExclusiveReadClass_payload  = require("./utils/OptimizeExclusiveReadClass_payload");

const SectionRegisteration = async (sections) => {
  try {
    let new_sections = [];
    await Promise.all(
      sections.map(async (section) => {
        if(section.ClassTeacher =="none") delete section.ClassTeacher
        let newSection = await Sections_Class.create({
          ...section,
          Subjects_teachers: Object.values(section.Subjects_teachers),
        });
        new_sections.push(newSection._doc._id);
      })
    );
    return new_sections;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const ClassRegisteration = async (req, res) => {
  let { payload } = req.body;
  try {
    let sections = payload.sections;
    delete payload.sections;
    let Class_exist = await Class.findOne(payload);
    if (!Class_exist) {
      let newClass = await Class.create(payload);
      let newClassId =newClass._id||newClass._doc._id
      await Session.findByIdAndUpdate(payload.SessionId, {
        $push: { Classes: newClassId },
      });
      let Sections = sections.map((section) => ({
        ...section,
        Class: newClass._doc._id,
      }));
      let section_response = await SectionRegisteration(Sections);

      if (section_response) {
         await Class.findByIdAndUpdate(newClassId, {
          sections: section_response,
        });
        await SetupPaymentConfigAuto(payload.SessionId,newClassId)

        Respond({
          res,
          success: true,
          message: "Class Created",
          status: 201,
          payload: newClass,
        });

      } else {
        await Class.findByIdAndDelete(newClass._id) // to keep the consitency and durablilty on error
        Respond({
          res,
          success: false,
          message: "Something went wrong,try again later!",
          status: 401,
        }); }
     }
    else{
      Respond({
        res,
        success: false,
        message: "Class already exists",
        status: 501,
      });
    }}
   catch (err) {
    console.log(err);
    Respond({
      res,
      success: false,
      message: "Something went wrong,try again later!",
      status: 401,
    });
  }
};

const Read_all_Classes = async (req, res) => {
  try {
    let result = await redis?.get("classes")
    if(result) {
      return Respond({
      res,
      success: true,
      message: "Classes fetched",
      status: 200,
      payload: JSON.parse(result),
    });
  }

    let Sessions = (
      await Session.find().select("session_name acedmic_year _id")
    ).map((e) => ({ [e.acedmic_year]: e._id }));
    let ActiveSession = await Session.findOne({ isActive: true }).select("_id"); //By default only the current session classes wil be fetched
    let Classes = await Class.find({ SessionId: ActiveSession })
    .populate({path:"sections",select:"start_date end_date name Students"}).populate({path:"SessionId",select:"session_name acedmic_year"})
    .select(" name sections start_date end_date");
    let payload = JSON.parse(JSON.stringify(Classes));
    
    payload.forEach((elm, index) => {
      payload[index].Students = [];
      payload[index].Session = payload[index]?.SessionId;
      delete payload[index].SessionId
      elm.sections.forEach((section) => {
        payload[index].Students.push(...section.Students);
      });
    });

    let Payload =await PaymentConfigClassValidator(Classes,ActiveSession._id,payload)
    result = { payload:Payload, Filters: Sessions  }
    await redis?.set("classes",JSON.stringify(result),"EX",60*3)

  return  Respond({
      res,
      success: true,
      message: "Classes fetched",
      status: 200,
      payload: result,
    });
  } catch (err) {
    console.log(err);
    Respond({
      res,
      success: false,
      message: "Something went wrong,try again later!",
      status: 401,
    });
  }
};

const Filter_Read_Classes = async (req, res) => {
  let { SessionId } = req.body;
  try {
    let Classes = await Class.find({ SessionId })
    .populate({path:"sections",select:"start_date end_date name Students"}).populate({path:"SessionId",select:"session_name acedmic_year"})
    .select(" name sections start_date end_date");
  let payload = JSON.parse(JSON.stringify(Classes));
  payload.forEach((elm, index) => {
    payload[index].Students = [];
    payload[index].Session = payload[index]?.SessionId;
    delete payload[index].SessionId
    elm.sections.forEach((section) => {
      payload[index].Students.push(...section.Students);
    });
  });
  let Payload =await PaymentConfigClassValidator(Classes,SessionId,payload)
Respond({
      res,
      success: true,
      message: "Classes fetched",
      status: 200,
      payload:Payload,
    });
  } catch (err) {
    console.log(err)
    Respond({
      res,
      success: false,
      message: "Something went wrong,try again later!",
      status: 401,
    });
  }
};

const Read_Class_details = async (req, res) => {
  let { id } = req.params;
  try {
    if(id.length!=24||!id) return res.status(404).json({message:"Invalid Class Id"})
    let class_payload = await Class.findById(id)
      .populate({
        path: "sections",
        populate: { path: "ClassTeacher Students Subjects_teachers.Teachers" },
      })
      .populate({path:"SessionId",select:"session_name acedmic_year "});
  if(!class_payload){ return res.status(404).json({message:"Class Not Found"})}

  let payload = OptimizeExclusiveReadClass_payload(class_payload)
  let {Payload:PaymentConfigDetails,isPaymentConfigUpdate} =await ReadPaymentConfigsBasedonClass(class_payload.SessionId._id,class_payload._id.toString())
  payload.PaymentConfigDetails =  PaymentConfigDetails
  payload.isPaymentConfigUpdate = isPaymentConfigUpdate
    Respond({
      res,
      success: true,
      message: "Classes fetched",
      status: 200,
      payload,
    });
  } catch (err) {
    console.log(err);
    Respond({
      res,
      success: false,
      message: "Something went wrong,try again later!",
      status: 401,
    });
  }
};


const updateSections = async(sections) =>{
  let new_sections = []
  await Promise.all(
    sections.map(async (section) => {
      let section_avaible = Sections_Class.findOne(section) 
      let new_section ;
      if(section_avaible) {
         new_section = await Sections_Class.findByIdAndUpdate(section._id, { ...section, Subjects_teachers: Object.values(section.Subjects_teachers),}
          , {new: true});
      }
      else {
        new_section = await Sections_Class.create({
          ...section,
          Subjects_teachers: Object.values(section.Subjects_teachers),
        });
      } 
      new_sections.push(new_section._id)  //pushing the updated section id to the new_sections array  if section is found or created successfully.  Else it will be null.  But we will still return new_sections array.  Even if some sections are not updated, the function will return all the successfully updated sections.  If no sections are updated, new_sections will be null.  But we will
    })
  );
  return new_sections;
}

const Edit_Class = async(req,res)=>{
  let {id, payload} = req.body;
  try{
    let sections = payload.sections ;
    delete payload.sections; 
    let updatedClass = await Class.findByIdAndUpdate(id, {...payload}, {new:true})
    if(updatedClass) {
      let updatedSections = await updateSections(sections.map(e=>({...e,Class:updatedClass._id||updatedClass._doc._id})));
      if(updatedSections.length !=0 ) {
        updatedClass = await Class.findByIdAndUpdate(id, {sections: updatedSections}, {new:true})
         Respond({
          res,
          success: true,
          message: "Class updated successfully",
          status: 200,
          payload: updatedClass
        });
      }
      else {
        Respond({
          res,
          success: false,
          message: "Something went wrong,try again later!",
          status: 401,
        });     
      }
    }
    else {
      Respond({
        res,
        success: false,
        message: "Something went wrong,try again later!",
        status: 401,
      });  
    }
    
  } catch(err){
    console.log(err);
    Respond({
      res,
      success: false,
      message: "Something went wrong,try again later!",
      status: 401,
    });
  }
}

const FetchClassInformation_Raw = async(req,res)=>{
  let {id} = req.params 
    let class_payload = await Class.findById(id).populate("sections")
    let payload = JSON.parse(JSON.stringify(class_payload))
    if(payload) {
      payload.sections.forEach((section,section_i)=>{
        section.Subjects_teachers.forEach(e=>{
          if (payload.sections[section_i].Subjects_teachers){
            payload.sections[section_i].Subjects_teachers = {}
          } 
          payload.sections[section_i].Subjects_teachers[e.subject] = e
        })
      })
      
      Respond({ res, payload:payload, success: false });
    }
    else {
      Respond({ res, message: "Class not found", success: false });
    }
    
}



const FetchClassBasedPaymentConfigInfo = async(req,res)=>{
  let {id} = req.params ;
  if(id.length!=24||!id) return res.status(404).json({message:"Invalid Class Id"})
  let class_payload = await Class.findById(id).populate("SessionId name")
  if(!class_payload) {return Respond({ res,status:404, message: "Class not found", success: false });}
  let payment_configs = await PaymentConfig.find({session : class_payload.SessionId ,isDeprecated:false }).select("classes feeStatus feeFrequency feeTitle")
  let OneTime_configs =await OneTimeFee.find({session : class_payload.SessionId ,isDeprecated:false }).select("classes feeStatus feeFrequency feeTitle")
  let Configs= [...payment_configs,...OneTime_configs]

let Payload = []  // {configId:{feeStatus,amount}}
Configs.forEach(config=>{
let payload= {Config:config,class:{classId:id}}
if(config.feeStatus == "Same amount for every Class"){
      payload.class.amount  = config.classes[0].amount
}
else {
      payload.class.amount  = config.classes.find(cl=>cl.classId.toString()==id)?.amount || 0
}
Payload.push(payload)

})
Respond({ res, payload:{Configs:Payload,ClassDetails:class_payload}, success: true });
}

const UpdateClassBasedPaymentConfig = async(req,res)=>{
  let {Configs} = req.body  //COnfigs = [Config:{id,feeTitle};class:{classId:}]

  try {
    for (const {Config: config, class: Class} of Configs) {
      if(config.feeFrequency != "One Time") {
        await PaymentConfig.findByIdAndUpdate(
          config._id,
          {
            $addToSet: {
              classes: {
                classId: Class.classId,
                amount: Class.amount
              }
            }
          },
          { new: true }
        );
      } else {
        await OneTimeFee.findByIdAndUpdate(
          config._id,
          {
            $addToSet: {
              classes: {
                classId: Class.classId,
                amount: Class.amount
              }
            }
          },
          { new: true }
        );
    }
  }

    Respond({
      res,
      success: true,
      message: "Payment configurations updated successfully",
      status: 200
    });
  } catch (err) {
    console.error(err);
    Respond({
      res,
      success: false,
      message: "Something went wrong, try again later!",
      status: 500
    });
  }

  

}


module.exports = {
  ClassRegisteration,
  Read_all_Classes,
  Read_Class_details,
  Filter_Read_Classes,
  Edit_Class,
  UpdateClassBasedPaymentConfig,
  FetchClassBasedPaymentConfigInfo,
  FetchClassInformation_Raw  //this function is used to fetch class information in raw format.  It is not used in the main API endpoints.  It is used for testing purpose.  You can delete this function if you don't need it.  It will return a raw JSON object of the class.  This function is not tested in the main API endpoints.  It is used for testing purpose.  You can delete this function if you don't need it.  It will return
};
