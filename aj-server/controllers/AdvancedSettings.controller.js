const { redis } = require("../db")
const Respond = require("../Helpers/ResponseHandler")
const GlobalConfig = require("../models/GlobalConfig")
const Students = require("../models/Students")

const GetGlobalConfigs = async (req,res)=>{
    let globalConfigs = await GlobalConfig.findOne({})
    if(globalConfigs.autoGR == undefined) globalConfigs = await GlobalConfig.findOneAndUpdate({},{autoGR:false,sortGR:false},{new:true})
    Respond({res,payload:globalConfigs})
}

const UpdateGlobalConfigs = async (req,res)=>{
    let {autoGR,sortGR,isTemporaryBlocked} = req.body
    let globalConfigs = await GlobalConfig.findOneAndUpdate({},{autoGR,sortGR,isTemporaryBlocked},{new:true})
    Respond({res,payload:globalConfigs, success:true, message:"Global configurations updated successfully!"})
}

const SortGRStudentsAction = async(req,res)=>{
let Config = await GlobalConfig.findOne().select("isSorted sortGR")
if(!Config.sortGR){return  res.status(401).json({success:false, message: "Sorting of GR have turned off.Enable to sort out." });}
const students = await Students.find().sort({DOA:1,createdAt:1}).select("_id GRNO")  

try{
    if(Config.isSorted) {
        return res.status(200).json({ message: "Students have sorted already." });
}



    async function AssignTempGR(){
        const bulkOps = students.map((std, ind) => ({
            updateOne: {
                filter: { _id: std._id },
                update: { $set: { GRNO:new Date().getTime()+ind} },
      },
    }));
    
    if (bulkOps.length > 0) {
        await Students.bulkWrite(bulkOps);
    }
}

async function SortGRNO(){
    const bulkOps = students.map((std, ind) => ({
        updateOne: {
            filter: { _id: std._id },
            update: { $set: { GRNO: ind + 1 } },
        },
    }));
    
    if (bulkOps.length > 0) {
        await Students.bulkWrite(bulkOps);
    }
}

//? Update the GRNOs in bulk
await AssignTempGR()
await SortGRNO()
await GlobalConfig.findOneAndUpdate({},{isSorted:true})
//? Respond with a success message
const reply = await redis?.scan(0, 'MATCH', 'students:*', 'COUNT', '100');
const keys = reply[1];
if (keys.length) {
  await redis?.del(keys);
}
await redis?.del(`totalstudents`)
return res.status(200).json({ message: "Students have assigned sorted GRNO successfully." });
}

catch (error) {
const Recover = students.map((std) => ({
updateOne: {
    filter: { _id: std._id },
    update: { $set: { GRNO: std.GRNO } },
    },
}));
await Students.bulkWrite(Recover);
console.log(error)
return res.status(500).json({success:false, message: "An error occurred during the update." });
}

}
module.exports = {GetGlobalConfigs,UpdateGlobalConfigs,SortGRStudentsAction}