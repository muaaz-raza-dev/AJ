const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");
const TransactionSchema = new mongoose.Schema({
    Year :{type:String,required:true},
    Months:{type:[{
        month:String,
        Monthly:{type:Boolean,default:true},
        dueDate:String,
        Annual:{type:Boolean,default:false},
        Extra:String,
    }]}
},{timestamps:true});

module.exports = mongoose.model("global_fee_preferences", TransactionSchema);