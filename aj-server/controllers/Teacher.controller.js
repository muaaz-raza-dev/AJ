const Respond = require("../Helpers/ResponseHandler");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const Session = require("../models/Session");



const RegsiterMember = async (req, res) => {
  try {

    const { payload } = req.body;
    if (payload?.firstName) {
      let Payload = payload;
      delete Payload.account_Details;
      Teacher.create(Payload).then(async (data) => {
        Respond({
          res,
          message: "The new member is successfully registered!",
          success: true,
        });
      });
    }
  }
catch(err){
  Respond({
    res,
    message: "Error occured Try again later!",
    success:false,
    status:501
  });
}
  };



const EditMember_Admin = async (req,res)=>{
  let { payload ,Id } = req.body;
  let teacher = await  Teacher.findById(Id)
  if (!teacher) {
  return  Respond({ res, message: "Teacher not found", success: false, status:404 });
  } 
  else {
    await Teacher.findByIdAndUpdate(Id, payload, { new: true } )
    let Payload = JSON.parse(JSON.stringify(payload));
    delete Payload.account_Details;
    Respond({ res, message: "Credentials updated successfully", success: true,  });
    }
}



const ValidateUserName = async (req, res) => {
  let { username } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    Respond({ res, message: "username available", success: true });
  } else {
    Respond({
      res,
      message: "username is taken",
      success: false,
    });
  }
};

const ReadTeachers_short = async (req, res) => {
  let Teachers = await Teacher.aggregate([
    {
    $group: {
      _id: "$acedmic_role",
      docs: {
        $push:'$$ROOT'
      }
    }
  },
     {
      $addFields: {
        acedmic_role: "$_id"
      }
    },
    {
      $project: {
        _id: 0 ,
      "docs.teaching_subjects":0 ,
        "docs.CNIC":0,
        "docs.address":0,
        "docs.schedule":0,
        "docs.salary":0,
        "docs.isWorking":0,
        "docs.createdAt":0,
        "docs.updatedAt":0,
        
        
        
        
      }
    }
  
  
  ])
  Respond({ res, message: "All teachers", payload: Teachers, success: true });
};

const ReadTeachers_detailed = async (req, res) => {
  let { id } = req.params;
  let Teachers = await Teacher.find({ id }).select(
    "-__v -createdAt -updatedAt  "
  );
  Respond({ res, message: "All teachers", payload: Teachers, success: true });

};

const FetchRequiredInformation_Class = async(req,res)=>{
  const {type} =req.params
  let Teachers = await Teacher.find().select(
    "_id firstName lastName"
  );
  let payload = {Sessions:{},Teachers:{none:"none"}}
  Teachers.forEach(elm=>{
    payload["Teachers"][`${elm.firstName} ${elm.lastName}`] = elm._id
  })
  if(type == "teachers"){
    return Respond({res, message: "Required Payload", payload, success: true})
  }
  let Sessions = await Session.find().select("session_name acedmic_year isActive _id")
  Sessions.forEach(elm=>{
    payload["Sessions"][`${elm.session_name} ${elm.acedmic_year}`] =elm
  })
  return Respond({ res, message: "Required Payload", payload, success: true });
}



const FetchTeacherRaw = async (req,res)=>{
  let { id } = req.params;
  if(!id||id.length!=24) return res.status(404).json({message:"Invlaid Id"})
    let teacher = await Teacher.findById(id).select("-__v -createdAt -updatedAt ");
if(!teacher) return res.status(404).json({message:"Teacher not found"})
  let user = await User.findOne({StaffId:id}).select("-password -__v -createdAt -updatedAt")
  Respond({ res, message: "All teachers", payload:teacher, success: true });
}

const FetchStaffRaw = async (req,res)=>{
  let { id } = req.params;
  if(!id||id.length!=24) return res.status(404).json({message:"Invlaid Id"})
  let account = await User.findById(id)
  if(!account) return res.status(404).json({message:"Invalid Credentials"})
  let teacher = await Teacher.findById(account.StaffId).select("-__v -createdAt -updatedAt -salary -schedule -courses -qualification");
if(!teacher) return res.status(404).json({message:"Teacher not found"})
  Respond({ res,  payload:teacher, success: true });
}

const ReadTeachers_Filtered = async(req,res) =>{
  let {type} = req.body
let Teachers=  await Teacher.aggregate([
    {$match:{"isWorking":type=="Current"}},
    {
    $group: {
      _id: "$acedmic_role",
      docs: {
        $push:'$$ROOT'
      }
    }
  },
     {
      $addFields: {
        acedmic_role: "$_id"
      }
    },
    {
      $project: {
        _id: 0 ,
       "docs.teaching_subjects":0 ,
        "docs.CNIC":0,
        "docs.address":0,
        "docs.schedule":0,
        "docs.salary":0,
        "docs.isWorking":0,
        "docs.createdAt":0,
        "docs.updatedAt":0,
        
        
        
        
      }
    }
  ])
  
  Respond({ res, payload: Teachers, success: true });

}

const EditMember_Personal_Photo = async(req,res)=>{
  let {photo} = req.body
  try {
    let user = await  User.findByIdAndUpdate(req.AdminId,{photo},{new: true} )
    if(user.Role!="cheif admin"){
      await  Teacher.findByIdAndUpdate(user.StaffId,{photo},{new: true} )
    }
    Respond({ res, message: "Photo updated successfully", success: true,  });
  } 
  catch (error) {
    console.log(error);
    Respond({ res, message: "Error while updating . Try again later", success: false, status:501 });
  }
}

const UpdateInfo_Personal = async(req,res)=>{ 
  let { payload } = req.body;
    try {
      let user = await  User.findById(req.AdminId)
      if(user.Role!="cheif admin"){
        await  Teacher.findByIdAndUpdate(user.StaffId,payload,{new: true} )
      }
      Respond({ res, message: "Credentials updated successfully", success: true,  });
    } 
    catch (error) {
      console.log(error);
      Respond({ res, message: "Error while updating . Try again later", success: false, status:501 });
    }
}

module.exports = {
  UpdateInfo_Personal,
  RegsiterMember,
  FetchTeacherRaw,
  EditMember_Admin,
  ValidateUserName,
  EditMember_Personal_Photo,
  ReadTeachers_short,
  ReadTeachers_detailed,
  ReadTeachers_Filtered,
  FetchRequiredInformation_Class,
  EditMember_Admin ,
  FetchStaffRaw
};
