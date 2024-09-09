const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema({
title:String,
content:{required:true,type:String},
date: { type: Date, default: Date.now },
sections:{type:[ mongoose.Schema.Types.ObjectId],ref: "Section"},
tags: { type: [String] },
publishedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
images:[String],
seenBy:{type:[mongoose.Schema.Types.ObjectId],ref:"Students",default:[]}
}, { timestamps: true });

module.exports = mongoose.model("Diary", DiarySchema);

