const Sessions = require("../../../models/Session.js")
const moment = require("moment")
const CalculateAllMonths =async () => {
    let FirstSession =  await Sessions.find().sort({start_date:1}).select("start_date").limit(1)
    let StartDate = moment(FirstSession?.[0].start_date,"M/D/YYYY").toISOString()

    function GenerateYearMonths (startDate){
        let payload = {}
        const start = moment(startDate)
        const current = moment() //End is now date

        let startYear = start.year()
        let startMonth = start.month()+1 // months counting starts from 0-11

        let currentYear = current.year()
        let currentMonth = current.month()+1


        const months = moment.months()
           for(let year = startYear; year <= currentYear; year++){
            if(year == currentYear) {
                 payload[year] =months.slice(startMonth-1,currentMonth)
            }
            else if(year == startYear){
                payload[year] = months.slice(startMonth-1)
            }
            else{payload[year] = months}
        }

        return payload
    }

const dates = GenerateYearMonths(StartDate)

return dates
}

module.exports =  CalculateAllMonths