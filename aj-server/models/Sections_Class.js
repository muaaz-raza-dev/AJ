const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Class: { type: ObjectId, ref: "Class", required: true },
    ClassTeacher: { type: ObjectId, ref: "Teacher", required: true },
    Students:{type: [ObjectId], ref: "Students",  },
    capacity  : Number,
    start_date : {type:String,required:true},
    end_date : {type:String,},
    Subjects_teachers: [{
        subject : String,
        Teachers :{type:[mongoose.Schema.Types.ObjectId] , ref:"Teacher"} , //! Teacher shema needs to be created!
    }]
}, { timestamps: true });

module.exports = mongoose.model("Section", SectionSchema);



