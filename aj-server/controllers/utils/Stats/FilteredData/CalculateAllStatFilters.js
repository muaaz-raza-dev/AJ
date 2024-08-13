const PaymentConfig = require("../../../../models/PaymentConfigs");
const moment = require("moment");
const lod  = require("lodash")
const Session = require("../../../../models/Session");
const Class = require("../../../../models/Class");
const { redis } = require("../../../../db");
const { SortSessionMonthbyYears } = require("../../OptimizeSessionDates_SchoolPayment");

const CalculateAllStatFilters = async (isAll) => {
  const RedisIndex = `filterableStats:filters${isAll?":AllClasses":""}`
  try {
    let Payload = await redis?.get(RedisIndex)
    if(Payload) return JSON.parse(Payload)

     Payload = {Dates:{},PaymentConfigs:{},Classes:{}}
    // Fetch all Sessions
    const Sessions = await Session.find().select("_id acedemic_year session_name start_date end_date")

    // Fetch all Payment configs

    const paymentConfigs = await PaymentConfig.find({isDeprecated:false}).select("session feeFrequency feeTitle");

    // Fetch all classes
    const classes = await Class.find().select("name SessionId");

    // Populate Payload.PaymentConfigs
    paymentConfigs.forEach(pay=>{
    if(!Payload.PaymentConfigs[pay.session])Payload.PaymentConfigs[pay.session]=[]
    Payload.PaymentConfigs[pay.session].push({label:pay.feeTitle,value:pay._id,feeFrequency:pay.feeFrequency})
    })

    // Populate Payload.Classes
    let InitClassLabel = isAll ? [{label:"All Classes",value:"all"} ]:[]
    
    classes.forEach(cl=>{
        if(!Payload.Classes[cl.SessionId])Payload.Classes[cl.SessionId]=InitClassLabel
        Payload.Classes[cl.SessionId].push({label:cl.name,value:cl._id})
    })

    // Populate Payload.Dates 
    Sessions.forEach(sess=>{
        let {start_date,end_date} = sess
        let dates = SortSessionMonthbyYears(start_date,end_date)
        dates = lod.groupBy(dates, ({ year }) => year);

        const finalDate = {}
        Object.keys(dates).forEach(year => {
            finalDate[year] = dates[year].map(date => date.month);
        });

        Payload.Dates[sess._id.toString()] = finalDate;
    })

    await redis?.set(RedisIndex,JSON.stringify(Payload),"EX",60*10) //cahce for 10 minutes
    return Payload;
  } catch (error) {
    console.error("Error in CalculateAllStatFilters:", error);
    throw error;
  }
};

module.exports = CalculateAllStatFilters;
