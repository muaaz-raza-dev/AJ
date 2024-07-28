const Transactions = require("../../../models/Transactions")
const moment = require('moment');

const CalculateTotalRevenue = async() => {
// everything I am calculating for the currect and previous month...

const startOfCurrentMonth = moment().startOf('month').toISOString();
const endOfCurrentMonth = moment().endOf('month').toISOString();
const startOfPreviousMonth = moment().subtract(1, 'month').startOf('month').toISOString();
const endOfPreviousMonth = moment().subtract(1, 'month').endOf('month').toISOString();
async function CalculateTotalEarnedAmount (start,end) {
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
return TransactionsMonthly?.[0]?.total ||0
}

const CurrentMonthRevenue = await CalculateTotalEarnedAmount(startOfCurrentMonth,endOfCurrentMonth)
const PrevMonthRevenue = await CalculateTotalEarnedAmount(startOfPreviousMonth,endOfPreviousMonth)
let rate = PercentageCalculator(CurrentMonthRevenue,PrevMonthRevenue)    
return {total:CurrentMonthRevenue ,rate}


}

function PercentageCalculator(recent, prev) {
    
    if (prev == 0) {
        let Percentage  = 0
        let rate = ""
        if (recent == 0) {
            Percentage = 0; // No growth if both revenues are 0
            rate = "zero"
        } else {
            Percentage = 100; // Infinite growth if previous month revenue is 0 and current month revenue is > 0
            rate = "positive"
        }
        return {Percentage,rate} // Returning the percentage growth rate
    }
    else {
        const changeInRevenue = recent - prev; //will tell how much increase or decrease with respect to prev year
        const growthRate = (changeInRevenue / prev) ;
        const Percentage = + parseFloat(growthRate).toFixed(1)
        const rate = Percentage!=0?Math.sign(Percentage)==-1 ? "negative":"positive":"zero"
        return {Percentage,rate} // Returning the percentage growth rate
    }
}
module.exports = { CalculateTotalRevenue,PercentageCalculator}