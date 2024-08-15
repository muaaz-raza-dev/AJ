const Transactions = require("../../../../models/Transactions");
const { GetAverage } = require("./GetMonthlyChartReport");
const moment = require("moment")


const GetDailyChartReport =  async(date) => {
let {year,month}=date // month = "june" , year:"2024"
let Month =moment.months().indexOf(month)+1
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
let today = moment().date()
let currentMonth = moment().month()

console.log(currentMonth,Month-1)
for(let i=1;i<=EndDay;i++){
    if(currentMonth == (Month-1) ){
      if(today >= i){
        payload[i] ={revenue: Payments.find(p=>p._id==i)?.total || 0 , day:i}
      }
    }
    else {
      payload[i] ={revenue: Payments.find(p=>p._id==i)?.total || 0 , day:i}
    }
}

payload = Object.values(payload)
let average = GetAverage(payload)||0
return {chartData:payload,average};

}

module.exports =  GetDailyChartReport