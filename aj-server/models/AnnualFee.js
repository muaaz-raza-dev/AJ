const mongoose = require('mongoose');
const AnnualFeeSchema = new mongoose.Schema({
    Classes:{type:[{Class:String,Fee:Number,DueDate:Date}]},
    isGlobal :{type:Boolean},
    Global:{type:{Fee:Number,DueDate:Date}}
},{timestamps:true});
const AnnualFee = mongoose.model('AnnualFee', AnnualFeeSchema);
module.exports = AnnualFee;
