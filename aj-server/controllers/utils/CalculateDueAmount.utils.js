const moment = require("moment");
// const Student_History = require("../../models/Student_History");
// AcademicFee : academic fee holds the academic preferences i.e: in may 2023 academy charge monthlyFee
const TotalRecordedAmount = async (StudentFinance, AcademicFee, DOA) => {
  let Total = 0;
  let FeeRecord = [] 
  AcademicFee.map((item) => {
    let Year = +item.Year;
    let DYear = moment(DOA).year();
    let Dmonth = moment(DOA).month();
    if (Year >= DYear) {
      let MonthlyFee = 0;
      item.Months.map((mon) => {
        let month = moment.months().indexOf(mon.month); //month by index jan=0 ,...
        let MonthlyFeeContext = FeeRecord?.MonthlyFee?.find((i) => moment(i.time).month() >= month);
        if (MonthlyFeeContext) {
          MonthlyFee = MonthlyFeeContext.Fee;
        }
        else MonthlyFee= StudentFinance.MonthlyFee
        if (mon.Annual) Total += StudentFinance.AnnualFee;
        if (Year == DYear) {
          if (month >= Dmonth && mon.Monthly) {
            Total += MonthlyFee;
          }
        } else Total += MonthlyFee;
      });
    }
  });
  if (StudentFinance._doc.AdmissionFee.paid == false) {
    Total += StudentFinance._doc.AdmissionFee.amount;
  }
  return Total;
};



module.exports = TotalRecordedAmount;
