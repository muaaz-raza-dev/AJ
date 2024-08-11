const moment = require("moment");

const OptimizeDates = (start_date,end_date)=>{
let payload = []
let startD = moment(new Date(start_date).toISOString())
let endD = moment(new Date(end_date).toISOString())
let start = {year:startD.year(),month:startD.month(),day:startD.date()}
let end = {year:endD.year(),month:endD.month(),day:endD.date()}
const partialDate  = 16
// if startDate greater then charge this year
// if startDate lesser then charge next year
Array(12).fill(12).map((_,i)=>{
let month = i
if(month > start.month) {
if(i==0&&start.day < partialDate) {
payload.push({year:start.year,month:moment.months()[month],paymentDate:'',dueDate:"" ,isPayment:true,})
}
else{
payload.push({year:start.year,month:moment.months()[month],paymentDate:'',dueDate:"" ,isPayment:true,})
}

}
else {
if(month <= end.month) {
if(i==11&&start.day >= partialDate) { 
payload.push({year:end.year,month:moment.months()[month],paymentDate:'',dueDate:"" ,isPayment:true,})
}
else payload.push({year:end.year,month:moment.months()[month],paymentDate:'',dueDate:"" ,isPayment:true,})
}
}
})
    return payload
}
module.exports = {OptimizeDates}