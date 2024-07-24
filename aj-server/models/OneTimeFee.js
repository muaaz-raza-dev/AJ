const mongoose = require('mongoose');
const {ObjectId} =require("mongodb")
const OneTime_Fee = new mongoose.Schema({
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
        "feeDescription": {
          "type": "String",
          "description": "Description of the fee"
        },
        isParent:{type:Boolean,default:false},
        "feeFrequency":{type:String,default:"One Time"},
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
        isDeprecated:{type:Boolean,default:false},
        Parent :{type:ObjectId,ref:"OneTime-Fee"},
        Children:{type:[ObjectId],ref:"OneTime-Fee"},
},{timestamps:true});
const OneTimeFee = mongoose.model('OneTime-Fee', OneTime_Fee);
module.exports = OneTimeFee;


//?  The architecture is that one will be the parebnt of the smae type and the updated versions of all will be its Childrens