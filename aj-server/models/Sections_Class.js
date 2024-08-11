const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Class: { type: ObjectId, ref: "Classes", required: true },
    ClassTeacher: { type: ObjectId, ref: "Teacher"},
    Students:{type: [ObjectId], ref: "Students"  },
    subjects: {type:[String],},
    capacity  : Number,
    start_date : {type:String,required:true},
    end_date : {type:String,},
    Subjects_teachers: [{
    subject : String,
    Teachers:{type:[mongoose.Schema.Types.ObjectId] , ref:"Teacher"} , //! Teacher shema needs to be created!
}],
isSubTeacherDetails:{type:Boolean,default:false},
}, { timestamps: true });

module.exports = mongoose.model("Section", SectionSchema);



