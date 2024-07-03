const bcryptjs = require("bcryptjs");
const Respond = require("../Helpers/ResponseHandler");
const Teacher = require("../models/Teacher");
const User = require("../models/User");

const CreateMemberAccount = async (Credentials, Teacher_Id) => {
  let { username, password, role } = Credentials;
  bcryptjs.hash(password, 8, function (err, hash) {
    if (!err) {
      User.create({ username, password: hash, Role: role, Teacher_Id });
      return true;
    } else false;
  });
};
const RegsiterMember = async (req, res) => {
  const { payload } = req.body;
  if (payload?.firstName) {
    let Credentials = payload.account_Details;
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

const ValidateUserName = async (req, res) => {
  let { username } = req.params;
  let user = await User.findOne({ username });
  if (user) {
    Respond({ res, message: "username available", success: true });
  } else {
    Respond({
      res,
      error: "Already exits",
      message: "username is taken",
      success: false,
      status: 501,
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

const FetchTeachers_Names = async(req,res)=>{
  let Teachers = await Teacher.find().select(
    "_id firstName lastName"
  );
  let payload = {}
  Teachers.forEach(elm=>{
    payload[`${elm.firstName} ${elm.lastName}`] = elm._id
  })
  Respond({ res, message: "All teachers with key value pairs", payload, success: true });

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
  ValidateUserName,
  ReadTeachers_short,
  ReadTeachers_detailed,
  ReadTeachers_Filtered,
  FetchTeachers_Names
};
