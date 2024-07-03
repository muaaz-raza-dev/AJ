const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subjects: {type:[String],required:true},
    sections :[{type:ObjectId,ref:"Section"}]
}, { timestamps: true });

module.exports = mongoose.model("Classes", ClassSchema);

