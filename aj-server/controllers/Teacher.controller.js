const bcryptjs = require("bcryptjs");
const Respond = require("../Helpers/ResponseHandler");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const Session = require("../models/Session");

const CreateMemberAccount = async (Credentials, StaffId) => {
  let { username, password, Role } = Credentials;
  bcryptjs.hash(password, 8, function (err, hash) {
    if (!err) {
      User.create({ username, password: hash, Role, StaffId });
      return true;
    } else false;
  });
};

const RegsiterMember = async (req, res) => {
  const { payload } = req.body;
  if (payload?.firstName) {
    let Credentials = {...payload.account_Details ,email:payload.email , Name:payload.firstName};
    let Payload = payload;
    delete Payload.account_Details;
    Teacher.create(Payload).then(async (data) => {
      let Response = await CreateMemberAccount(Credentials, data._id);
      if (Response)
        Respond({
          res,
          message: "The new member is successfully registered!",
          success: true,
          payload: data,
        });
      else
        Respond({
          res,
          message: "Something went wrong , try again!",
          success: false,
          payload: data,
        });
    });
  }
};

const updateMember_credentials = async (payload,StaffId) =>{
const Payload = payload 
delete Payload.username 

try {
  let MemberAccount =await User.findOne({StaffId})
  let password =await bcryptjs.compare(Payload.password,MemberAccount.password)
if(!Payload.password||password) { await User.findOneAndUpdate({StaffId},{...Payload,isLogOutRequired:true})
    return true
}
else {
  bcryptjs.hash(Payload.password, 8, async function (err, hash) {
    if(!err){
      return await  User.findOneAndUpdate({StaffId},{...Payload,password:hash})
    }
    else Respond({ res, message: "Error while updating . Try again later", success: false, status:501 });
  })
  return true
}
} catch (error) {
  console.log(error);
  return false
}
}

const EditMember_Admin = async (req,res)=>{
  let { payload ,Id } = req.body;
  let teacher = await  Teacher.findById(Id)
  if (!teacher) {
    Respond({ res, message: "Teacher not found", success: false, status:404 });
  } else {
    await Teacher.findByIdAndUpdate(Id, payload, { new: true } )
    let Credentials = {...payload.account_Details ,email:payload.email , Name:payload.firstName};
    let Payload = JSON.parse(JSON.stringify(payload));
    delete Payload.account_Details;
    await updateMember_credentials(Credentials,Id)
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
    let Teachers = await Teacher.find().select(
    "_id firstName lastName"
  );
  let Sessions = await Session.find().select("session_name acedmic_year isActive _id")
  let payload = {Sessions:{},Teachers:{}}
  Sessions.forEach(elm=>{
    payload["Sessions"][`${elm.session_name} ${elm.acedmic_year}`] =elm
  })
  Teachers.forEach(elm=>{
    payload["Teachers"][`${elm.firstName} ${elm.lastName}`] = elm._id
  })
  Respond({ res, message: "Required Payload", payload, success: true });
}



const FetchTeacherRaw = async (req,res)=>{
  let { id } = req.params;
  if(!id||id.length!=24) return res.status(404).json({message:"Invlaid Id"})
    let teacher = await Teacher.findById(id).select("-__v -createdAt -updatedAt ");
if(!teacher) return res.status(404).json({message:"Teacher not found"})
  let user = await User.findOne({StaffId:id}).select("-password -__v -createdAt -updatedAt")
  Respond({ res, message: "All teachers", payload:{...teacher._doc,account_Details:user}, success: true });
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
