const Students = require("../models/Students");
const FeePref = require("../models/Global_Fee_Preferences");
const moment = require("moment");

    async function LoadGlobalValues  (req,res){
        
        try {
            // let CruicialUpdates = false;
            let FeeRecord = await FeePref.findOne({Year:moment().year()})
let Fee_Pref_update_required = false
            if (FeeRecord) { if(!FeeRecord.Months[moment().month()])  Fee_Pref_update_required=true}
            else {
                Fee_Pref_update_required=true
                months = []
                moment.months().forEach((elm,index)=>{
                    if(index >= moment().month()){
                    }
                    else{
                        months.push({month:elm,Fee:true,Annual:false,Monthly:true})
                    }
                }) 

                await FeePref.create({Year:moment().year(),Months:months})
            }
            let classes = (await Students.aggregate([{$group: {_id: "$Class",}}])).map(elm=>elm._id)
            let totalStudents = await  Students.countDocuments();
            
            res.json({success:true,totalStudents,classes,Fee_Pref_Update_Req:Fee_Pref_update_required})
        }
        catch (err){
        res.status(500).json({success:false, message:"Failed to register student", error: err.message});
        }
        }
    module.exports = {LoadGlobalValues}