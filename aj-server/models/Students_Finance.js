const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const Std_FinSchema = new mongoose.Schema({
 Student:{type:ObjectId,ref:"Students"},
 AdmissionFee:{type:{amount:Number,paid:Boolean}},
 MonthlyFee:{type:Number},
},{timestamps:true});
module.exports = mongoose.model("Std_Finance", Std_FinSchema);