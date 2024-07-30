const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sections :[{type:ObjectId,ref:"Section"}],
    start_date : {type:String,required:true},
    end_date : {type:String,},
    SessionId:{type:ObjectId,ref:"YearlySession"}
}, { timestamps: true });

module.exports = mongoose.model("Classes", ClassSchema);

