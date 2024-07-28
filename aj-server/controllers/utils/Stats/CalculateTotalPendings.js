const Students = require("../../../models/Students")
const { CalculateFeeDues } = require("../Transaction/CalculateFeeDues.utils")

const CalculateTotalPendings = async()=>{
let AllStudents  = await Students.find({TerminateEnrollment:false})
let TotalPendings = 0 
for (const student of AllStudents) {
    let { Dues } = await CalculateFeeDues(student);
    TotalPendings += Dues.reduce((acc,e)=> acc += e.amount ,0);
}

return {total:TotalPendings}

}

module.exports = {CalculateTotalPendings}