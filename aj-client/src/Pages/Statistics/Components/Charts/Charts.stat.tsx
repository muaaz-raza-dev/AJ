
import DailyRevenueGraph from "./Daily/DailyRevenueGraph.stat"
import MonthlyRevenueChart from "./MonthlyRevenueChart.stat"


const Charts = () => {
  return (
    <div className="flex  w-full ">
   <MonthlyRevenueChart/>
  <DailyRevenueGraph/>
        </div>
  )
}

export default Charts