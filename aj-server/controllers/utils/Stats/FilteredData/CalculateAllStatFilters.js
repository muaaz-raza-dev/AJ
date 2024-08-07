const PaymentConfig = require("../../../../models/SchoolPayments");
const moment = require("moment");
const Session = require("../../../../models/Session");
const Class = require("../../../../models/Class");

const CalculateAllStatFilters = async () => {
    const Payload = {Dates:{},PaymentConfigs:{},Classes:{}}
  try {
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
    classes.forEach(cl=>{
        if(!Payload.Classes[cl.SessionId])Payload.Classes[cl.SessionId]=[{label:"All Classes",value:"all"}]
        Payload.Classes[cl.SessionId].push({label:cl.name,value:cl._id})
    })

    // Populate Payload.Dates 
    const months = moment.months()
    Sessions.forEach(sess=>{
        
        const Dates = {};
        const startDate = moment(sess.start_date)
        const endDate = moment(sess.end_date)
        
        const startMonth = startDate.month()
        const startYear = startDate.year()
        
        const endMonth = endDate.month()
        const endYear = endDate.year()

        Dates[startYear] = months.slice(startMonth)
        Dates[endYear] = months.slice(0,endMonth)

        Payload.Dates[sess._id.toString()] = Dates;
    })
    
    return Payload;
  } catch (error) {
    console.error("Error in CalculateAllStatFilters:", error);
    throw error;
  }
};

module.exports = CalculateAllStatFilters;
