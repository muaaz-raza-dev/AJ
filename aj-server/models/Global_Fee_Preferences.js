const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const TransactionSchema = new mongoose.Schema({
    Year :{type:String,required:true},
    Months:{type:[{
        month:String,
        Fee:Boolean,
        Annual:Boolean,
        Extra:String
    }]}
},{timestamps:true});

module.exports = mongoose.model("global_fee_preferences", TransactionSchema);