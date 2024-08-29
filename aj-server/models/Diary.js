const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema({
title:String,
content:{required:true,type:String},
date: { type: Date, default: Date.now },
sections:{type:[ mongoose.Schema.Types.ObjectId],ref: "Section"},
tags: { type: [String] },
publishedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
images:[String],
}, { timestamps: true });

module.exports = mongoose.model("Diary", DiarySchema);

