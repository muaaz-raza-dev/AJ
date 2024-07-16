const mongoose = require('mongoose');
const {ObjectId} =require("mongodb")
const AnnualFeeSchema = new mongoose.Schema({
        "feeTitle": {
          "type": "String",
          "required": true,
          "description": "Title of the fee"
        },
        "session": {
          "type": ObjectId,
          "ref": "YearlySession",
          "description": "Reference to the yearly session"
        },
        "feeScope": {
          "type": "String",
          "enum": ["Global", "Session-based"],
          "description": "Scope of the fee"
        },
        "feeDescription": {
          "type": "String",
          "description": "Description of the fee"
        },
        "feeFrequency": {
          "type": "String",
          "enum": ["Monthly", "Yearly", "One Time","Custom"],
          "required": true,
          "description": "Type of the fee"
        },
        "feeStatus": {
          "type": "String",
          "enum": ["Same amount for every Class", "Different amount for every Class"],
          "description": "Status indicating whether the fee is the same for every class or section"
        },
        "classes": {
          "type": [
            {
              "classId": {
                "type": ObjectId,
                "ref": "Classes",
                required:true,
                "description": "Reference to the class"
              },
              "amount": {
                required:true,
                "type": "Number",
                "description": "Fee amount for the class"
              }
            }
          ],
          "description": "List of classes with their respective fee amounts"
        },
        "feeAmount": {
          "type": "Number",
          "description": "It will be there if the type is one time etc"
        },
        "paymentMonths": {
          "type": [
            {
              "isPayment": {
                "type": "Boolean",
                "description": "Indicates if payment is made"
              },
              "year": {
                "type": "String",
                "description": "Year of the payment"
              },
              "month": {
                "type": "String",
                "description": "Month of the payment"
              },
              "dueDate": {
                "type": "String",
                "description": "Due date for the payment"
              },
              "paymentDate": {
                "type": "String",
                "description": "Date when the payment was made"
              }
            }
          ],
          "description": "List of payment months with their respective details"
        }
        ,
        paymentDate:String,
        dueDate:String ,
        deprecateDate:String , 
        isDeprecated:{type:Boolean,default:false},
        newVersionId:{type:ObjectId,ref:"PaymentConfig"}
      
},{timestamps:true});
const PaymentConfig = mongoose.model('PaymentConfig', AnnualFeeSchema);
module.exports = PaymentConfig;
