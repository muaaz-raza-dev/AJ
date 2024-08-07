const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true  },
    lastName: { type: String,  },
    photo : String,
    CNIC:{type:String ,required:true,unique:true},
    email: { type: String, required: true, },
    phone: { type: String, required: true },
    wa: { type: String, required: true },
    address: { type: String, required: true },
    qualification : {type:{College:String,Degree:String,
     Experience:String}},
     Date_Hire:String ,
    courses : [String] ,
    schedule: {type:{Start:String , End:String}} ,
    salary: {type:Number ,required:true},
    teaching_subjects :[String] ,
    acedmic_role : String ,
    isWorking:{type:Boolean , default:true},
    dateOfResignation:{type:String}
}, { timestamps: true });

module.exports = mongoose.model("Teacher", TeacherSchema);
