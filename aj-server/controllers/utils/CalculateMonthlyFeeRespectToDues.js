let moment = require("moment");

const CalculateMonthlyFeeRespectToDues = async (StudentId) => {
//   let StudentsMonthlyFeeHistory = await Student_History.findOne({
//     Student: StudentId,
//   });
//   let MonthlyFee_Limits = StudentsMonthlyFeeHistory.MonthlyFee.map(
//     ({_doc:e}, i, arr) => {
//         let Result = {...e};
//         if(i<arr.length-1){
//             Result["duration"]={}
//             let Year = moment(e.Time).year().toString(); //The year of the current element
//             let Month = moment(e.Time).month(); //The month of the current element
//             let Next_history_year = moment(arr[i + 1]._doc.Time).year().toString(); //The year of the current+1 element to calculate the limit of current element
//             let Next_history_month = moment(arr[i + 1]._doc.Time).month(); //The month of the current+1 element to calculate the limit of current element
//             Result["duration"][Year]=null;
//             if (+Year < +Next_history_year) {
//         let NextDocMonths = Array.from(Array(Month).fill(""), (_,i) =>moment.months()[i]);
//         let CurrentDocMonths = Array.from(Array(11 - Month - 1).fill(""), (_,i) =>moment.months()[i + Month]); //-1 is to exclude the month in which it is changed
//         console.log(NextDocMonths,CurrentDocMonths);
//         Result["duration"][Next_history_year]=null;
//         Result["duration"][Year] = CurrentDocMonths;
//         Result["duration"][Next_history_year] = NextDocMonths;
//     } else {
//         let CurrentDocMonths = Array.from(
//             Array(Next_history_month - Month).fill(""),
//             (i) => moment.months().indexOf(i + Month)
//         );
//         Result["duration"][Year] = CurrentDocMonths;
//     }
// }

//     return Result;

//     }
//   );
  // return MonthlyFee_Limits
};

module.exports= CalculateMonthlyFeeRespectToDues;
