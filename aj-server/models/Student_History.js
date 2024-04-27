const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const StudentsHistorySchema = new mongoose.Schema({
Student:{type:ObjectId,ref:"student"},
ClassHistory:{type:[{Class:String,Time:{type:Date,default:Date.now}}]},
AnnualFee:{type:[{Fee:Number,Time:{type:Date,default:Date.now},twerk:Boolean,Less:Number}]},
MonthlyFee:{type:[{Fee:Number,Time:{type:Date,default:Date.now}}]},
},{timestamps:true});

module.exports = mongoose.model("student_history", StudentsHistorySchema);


