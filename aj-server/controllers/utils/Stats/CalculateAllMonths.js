const Sessions = require("../../../models/Session.js")
const moment = require("moment")
const CalculateAllMonths =async () => {
    let FirstSession =  await Sessions.find().sort({start_date:1}).select("start_date").limit(1)
    let StartDate = moment(FirstSession?.[0].start_date,"M/D/YYYY").toISOString()

    function GenerateYearMonths (startDate){
        let payload = {2024:[""]}
        const start = moment(startDate)
        const end = moment()

        let startYear = start.year()
        let endYear = end.year()
        let startMonth = start.month()
        let endMonth = end.month()

        const months = moment.months()
        for(let year = startYear; year <= endYear; year++){
            if(year ==startYear)  payload[year] =months.slice(startMonth)
            else if(year == endYear){payload[year] = months.slice(0, endMonth+1)  }
            else payload[year] = months
        }

        return payload
    }

const dates = GenerateYearMonths(StartDate)
return dates
}

module.exports =  CalculateAllMonths