const Respond = require("../Helpers/ResponseHandler");
const CalculateAllStatFilters = require("./utils/Stats/FilteredData/CalculateAllStatFilters");
const { CalculateMonthlyStdFeeReport } = require("./utils/Stats/Student Fee Report/CalculateMonthlyStdFeeReport");
const CalculateYearlyStdFeeReport = require("./utils/Stats/Student Fee Report/CalculateYearlyStdFeeReport");

const GetStudentFeeReportFilters = async (req, res) => {
  const Filters = await CalculateAllStatFilters();
  Respond({ res, payload: Filters });
};

const GetStudentFeeReport = async (req, res) => {
  const { PaymentConfig, Type, Month, FeeFrequency, Year, Class } = req.body;
  let payload ; 
  if(FeeFrequency == "Monthly" || FeeFrequency == "Custom" ){
     payload = await CalculateMonthlyStdFeeReport(PaymentConfig,Month,Year,Class,Type);
    }
    else {
        payload = await CalculateYearlyStdFeeReport(PaymentConfig,Class,Type);

    }
  Respond({ res, payload });
};
module.exports = { GetStudentFeeReportFilters, GetStudentFeeReport };
