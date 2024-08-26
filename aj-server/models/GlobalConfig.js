const mongoose = require("mongoose");

const GlobalConfig = new mongoose.Schema({
    isTemporaryBlocked:{type:Boolean,default:false},
    autoGR:{type:Boolean,default:false}, // automatic GRNO assign
    sortGR:{type:Boolean,default:false},  // enable GRNO sorting
    isSorted:{type:Boolean,default:false}, // to check wheter the students are sorted or not to increase efficency.
    isStdBlocked:{type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model("GlobalConfig", GlobalConfig);