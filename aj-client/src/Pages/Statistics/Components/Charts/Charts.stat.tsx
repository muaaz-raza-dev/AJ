
import DailyRevenueGraph from "./Daily/DailyRevenueGraph.stat"
import MonthlyRevenueChart from "./MonthlyRevenueChart.stat"


const Charts = () => {
  return (
    <div className="flex max-lg:flex-col max-lg:gap-4  w-full ">
<MonthlyRevenueChart/>
<DailyRevenueGraph/>
        </div>
  )
}

export default Charts