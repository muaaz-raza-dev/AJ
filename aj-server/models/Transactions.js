const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const TransactionSchema = new mongoose.Schema(
  {
    Student: { type: ObjectId, ref: "Students", required: true },
    amount: { type:{  realAmount:Number ,discount :Number ,totalAmount :Number}, required: true },
    PaidAmount: { type: Number }, 
    PayorsName: { type: String },
    Note: { type: String },
    RecievedBy: { ref: "User", type: ObjectId, required: true },
    Transactions: {
      type: [
        {
          paymentType: {type:String,enum:["Custom","Registered"]},
          paymentConfigId: {type:ObjectId,ref:"PaymentConfig"},
          paymentTitle:String,
          month: String,
          year: String,
          sessionId:{type:ObjectId,ref:"YearlySession"} ,
          amount:  {
            discount:Number ,  //Just in number 
            realAmount :Number , //without discount 
            totalAmount:Number  //After minusing the discount from real amount            
          },
        },
      ],
      required: true,
    },
    Time: { type: Date, default: Date.now },
    Invoice: { type: Number, unique: true },
    isCancelled:{type:Boolean, default:false},
    isDelayedRegistory:{type:Boolean,default:false}
  },
  { timestamps: true }
);
TransactionSchema.plugin(AutoIncrement, { inc_field: "Invoice" });
module.exports = mongoose.model("Transactions", TransactionSchema);
