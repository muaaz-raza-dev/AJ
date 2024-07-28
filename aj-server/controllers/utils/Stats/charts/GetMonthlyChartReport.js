const moment = require("moment")
const Transactions = require("../../../../models/Transactions")
const GetMonthlyChartReport = async (duration) => {
let Months  = 0
if(duration == "3 months") {Months = 3}
else if(duration == "6 months") {Months = 6}
else if(duration == "12 months") {Months = 12}

const Dates = GenerateMonthDates(Months)
const Revenues = await  GetMonthsRevenue(Dates)
const average = GetAverage(Revenues)
return {average,chartData:Revenues}
}


function GenerateMonthDates(noOfMonths){
let Dates = []
for (let i = 0; i < noOfMonths; i++) {
const month = moment.months()[moment().subtract(i,'month').month()]
const startDate= moment().subtract(i, 'month').startOf('month').toISOString();
const endDate= moment().subtract(i, 'month').endOf('month').toISOString();
Dates.push({month,startDate,endDate})
}
return Dates.reverse()
}

async function GetMonthsRevenue(Dates){
let Revenues = []
async function CalculateRevenue (start,end,month) {
    let TransactionsMonthly = await Transactions.aggregate([
        {
      $match: {
      Time:{$gte:new Date(start),$lte:new Date(end)}
      }
    } ,
    {
      $group: {
          _id: "",
          total: {
              $sum: "$amount.totalAmount"
            }
      }
    }
])
Revenues.push({revenue: TransactionsMonthly?.[0]?.total || 0, month})
}

for (let i = 0; i < Dates.length; i++) {
await CalculateRevenue(Dates[i].startDate,Dates[i].endDate,Dates[i].month)
}

return Revenues
}

function GetAverage (Revenues){
let TotalRevenue = Revenues.reduce((acc,e)=> acc += e.revenue,0)
let Average = TotalRevenue / Revenues.length
return Math.round(Average)

}

module.exports = { GetMonthlyChartReport,GetAverage}