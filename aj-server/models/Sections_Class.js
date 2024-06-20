const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Class: { type: ObjectId, ref: "Class", required: true },
    ClassTeacher: { type: ObjectId, ref: "Teacher", required: true },
    Capacity  : Number,
    schedule: [{
        day: { type: String, required: true },
        period : {type:String,required:true},
        Teacher :{type:ObjectId,required:true , ref:"Teacher "} , //! Teacher shema needs to be created!
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Section", SectionSchema);



