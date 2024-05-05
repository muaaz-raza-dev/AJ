const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const TransactionSchema = new mongoose.Schema({
 Student:{type:ObjectId,ref:"Students",required:true},
 totalAmount:{type:Number,required:true},
 PaidAmount:{type:Number,required:true},
 discountedTotal:{type:Number},
 PayorsName:{type:String},
 Note:{type:String},
 RecievedBy:{ref:"User",type:ObjectId,required:true},
 Transaction:{type:{},required:true},
 Time:{type:Date,default:Date.now},
 Type: {type: [String],required: true},
 Invoice:{type:Number,unique:true},
 Note:{type:String}
},{timestamps:true});
TransactionSchema.plugin(AutoIncrement, { inc_field: 'Invoice' });
module.exports = mongoose.model("Transactions", TransactionSchema);
