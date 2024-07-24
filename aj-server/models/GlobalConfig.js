const mongoose = require("mongoose");

const GlobalConfig = new mongoose.Schema({
    isTemporaryBlocked:{type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model("GlobalConfig", GlobalConfig);