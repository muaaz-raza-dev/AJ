const Transactions = require("../../../../models/Transactions");
const { GetAverage } = require("./GetMonthlyChartReport");
const moment = require("moment")


const GetDailyChartReport =  async(date) => {
let {year,month}=date // month = "june" , year:"2024"
let Month =moment.months().indexOf(month )+1
const start = moment(`${year}-${Month}-01`).startOf('month').toISOString();
const end = moment(`${year}-${Month}-01`).endOf('month').toISOString();

let Payments = await Transactions.aggregate([
    {
  $match: {
  Time:{$gte:new Date(start),$lte:new Date(end)}
  }
} , {
    $addFields: {
      "Day":{$dayOfMonth:'$Time'}
    }
  },
{
  $group: {
      _id: "$Day",
      total: {
          $sum: "$amount.totalAmount"
        }
  }
}
])
let payload = {}

let EndDay = moment(end).daysInMonth()

for(let i=1;i<=EndDay;i++){
    payload[i] ={revenue: Payments.find(p=>p._id==i)?.total || 0 , day:i}
}

payload = Object.values(payload)
let average = GetAverage(payload)

return {chartData:payload,average};

}

module.exports =  GetDailyChartReport