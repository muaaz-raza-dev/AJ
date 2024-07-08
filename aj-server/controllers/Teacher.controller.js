const bcryptjs = require("bcryptjs");
const Respond = require("../Helpers/ResponseHandler");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const Session = require("../models/Session");

const CreateMemberAccount = async (Credentials, Teacher_Id) => {
  let { username, password, Role } = Credentials;
  bcryptjs.hash(password, 8, function (err, hash) {
    if (!err) {
      User.create({ username, password: hash, Role, Teacher_Id });
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

const updateMember_credentials = async (payload,Teacher_Id) =>{
const Payload = payload 
delete Payload.username 
try {
  let MemberAccount = User.findOne({Teacher_Id:Id})
  let password = bcryptjs.compare(password,MemberAccount.password)
  if(! Payload.password || password) {  User.findOneAndUpdate({Teacher_Id:Teacher_Id },Payload)
    return true
}
else {
  bcryptjs.hash(password, 8, function (err, hash) {
    return  User.findOneAndUpdate({Teacher_Id:Teacher_Id },{...Payload,password:hash})
  })
  return true
}
} catch (error) {
  return false
  console.log(error);
}
}
const EditMember_Admin = async (req,res)=>{
  let { payload ,Id } = req.body;
  let MemberAccount = User.findOne({Teacher_Id:Id})
  if (MemberAccount) {
    let Credentials = {...payload.account_Details ,email:payload.email , Name:payload.firstName};
    let Payload = payload;
    delete Payload.account_Details;
    let account_details = updateMember_credentials(Credentials,Id)
    
    if(account_details) {
      let teacher =  Teacher.findByIdAndUpdate(Id, payload, { new: true } )
      if (teacher) {
        Respond({ res, message: "Error while updating", success: false,  });
      } else {
        Respond({ res, message: "Teacher updated successfully", success: true });
      }
    }
    else {
      Respond({ res, message: "Something went wrong,try again later!", success: false });
    }
  } else {
    Respond({ res, message: "Required Payload", success: false });
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
  let teacher = await Teacher.findById(id).select("-__v -createdAt -updatedAt");
  let user = await User.findOne({Teacher_Id:id}).select("-password -__v -createdAt -updatedAt")
  Respond({ res, message: "All teachers", payload:{...teacher._doc,account_Details:user}, success: true });
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

module.exports = {
  RegsiterMember,
  FetchTeacherRaw,
  EditMember_Admin,
  ValidateUserName,
  ReadTeachers_short,
  ReadTeachers_detailed,
  ReadTeachers_Filtered,
  FetchRequiredInformation_Class,
  EditMember_Admin
};
