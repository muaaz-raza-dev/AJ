const moment = require("moment");

const OptimizeDates = (start_date,end_date)=>{
let payload = []
let startD = moment(new Date(start_date).toISOString())
let endD = moment(new Date(end_date).toISOString())
let start = {year:startD.year(),month:startD.month()}
let end = {year:endD.year(),month:endD.month()}

Array(12).fill(12).map((_,i)=>{
let month = i
if(start.month <= month) {
payload.push({year:start.year,month:moment.months()[month],paymentDate:'',dueDate:"" ,isPayment:true,})
}
if(end.month > month) {
payload.push({year:end.year,month:moment.months()[month],paymentDate:'',dueDate:"" ,isPayment:true,})
}
})
    return payload
}
module.exports = {OptimizeDates}