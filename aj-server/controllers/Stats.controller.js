const { redis } = require("../db");
const Respond = require("../Helpers/ResponseHandler");
const PaymentConfig = require("../models/PaymentConfigs");
const Transactions = require("../models/Transactions");
const CalculateAllMonths = require("./utils/Stats/CalculateAllMonths");
const {
  CalculateNewAdmissions,
} = require("./utils/Stats/CalculateNewAdmissions");
const {
  CalculateTotalRevenue,
} = require("./utils/Stats/CalculateTotalRevenue");
const {
  CalculateTotalStudents,
} = require("./utils/Stats/CalculateTotalStduents");
const GetDailyChartReport = require("./utils/Stats/charts/GetDailyChartReport");
const {
  GetMonthlyChartReport,
} = require("./utils/Stats/charts/GetMonthlyChartReport");
const CalculateAllStatFilters = require("./utils/Stats/FilteredData/CalculateAllStatFilters");
const {
  CalculateMonthlyFeeReport,
} = require("./utils/Stats/FilteredData/CalculateMonthlyFeeReport");
const CalculateYearlyFeeReport = require("./utils/Stats/FilteredData/CalculateYearlyFeeReport");
const GeneralStats = async (req, res) => {
  try {
    let stats = await redis?.get("stats:overview");
    if (!stats) {
      stats = {};
      stats.totalStudents = await CalculateTotalStudents();
      stats.newAdmissions = await CalculateNewAdmissions();
      stats.MonthlyRevenue = await CalculateTotalRevenue();
      await redis?.set("stats:overview", JSON.stringify(stats),'EX',60*5); //5 minutes
    } else {
      const cachedStat = stats;
      stats = JSON.parse(cachedStat);
    }

    let Dates = await CalculateAllMonths(); // From the beggining of the software. {2024:["may","june","july"]}
    let FstatsFilters = await CalculateAllStatFilters(true); // For filterable Stats

    Respond({ res, payload: { ...stats, Dates, FstatsFilters } });
  } catch (err) {
    console.log(err);
    Respond({ res, error: err, status: 501, message: "Somthing went wrong." });
  }
};

const MonthlyChartReport = async (req, res) => {
  let { duration } = req.body;
  try {
    let data = await redis?.get(`stats:monthly:${duration}`);
    if (data) {
      return Respond({ res, payload: JSON.parse(data) });
    }

    data = await GetMonthlyChartReport(duration);
    await redis?.set(
      `stats:monthly:${duration}`,
      JSON.stringify(data),
      "EX",
      60 * 5
    ); // 5 minutes

    Respond({ res, payload: data });
  } catch (err) {
    console.log(err);
    Respond({ res, error: err, status: 501, message: "Somthing went wrong." });
  }
};

const DailyChartReport = async (req, res) => {
  let { date } = req.body;
  try {
    let data = await redis?.get(`stats:daily:${JSON.stringify(date)}`);
    if (data) {
      return Respond({ res, payload: JSON.parse(data) });
    }
    data = await GetDailyChartReport(date);
    await redis?.set(
      `stats:daily:${JSON.stringify(date)}`,
      JSON.stringify(data),
      "EX",
      60 * 5
    ); // 5 minutes
    Respond({ res, payload: data });
  } catch (err) {
    console.log(err);
    Respond({ res, error: err, status: 501, message: "Somthing went wrong." });
  }
};

const FilterableConfigStats = async (req, res) => {
  let {
    PaymentConfig: paymentConfig,
    month,
    year,
    Session,
    Class,
    feeFrequency,
  } = req.body;
  let Config = await PaymentConfig.findById(paymentConfig).select(
    "-createdAt -updatedAt "
  );
  if (!Config)
    return Respond({
      res,
      success: false,
      status: 404,
      message: "Payment Config not found. Try again later!",
    });
  let payload; // no of Student not the amount
  if (feeFrequency == "Custom" || feeFrequency == "Monthly") {
    payload = await CalculateMonthlyFeeReport(
      Config,
      month,
      year,
      Class == "all" ? "" : Class,
      Session
    );
  } else {
    payload = await CalculateYearlyFeeReport(Config, Session);
  }
  Respond({ res, payload });
};

const DetailedRevenueReport = async (req, res) => {
  const { Dates } = req.body;
try{
const groups = await Transactions.aggregate([
        {
          $match: {
            Time: {
              $gte: new Date(Dates.start),
              $lte: new Date(Dates.end),
            },
          },
        },
        {
          $unwind: {
            path: "$Transactions",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $group: {
            _id: "$Transactions.paymentTitle",
            fieldN: {
              $sum: "$Transactions.amount.totalAmount",
            },
          },
        },
        // Removed extra comma here
        {
          $project: {
            Name: "$_id",
            total: "$fieldN",
            _id: 0,
          },
        },
]);
return Respond({ res, payload: groups });
}
catch(err){
console.log(err)
return Respond({ res, message:err.message ,status:501 });
}
};

module.exports = {
  GeneralStats,
  MonthlyChartReport,
  DailyChartReport,
  FilterableConfigStats,
  DetailedRevenueReport,
};
