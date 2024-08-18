import { ChartFormRD } from "./Components/ChartFormRD.stat"
import FilterBarRD from "./Components/FilterBarRD.stat"
import RevenueLabelFormRD from "./Components/RevenueLabelFormRD.stat"

const RevenueDetailedPage = () => {
  return (
    <div className=" bg-gray-100 flex flex-col gap-2">
        <FilterBarRD/>
      <div className="flex justify-between">
      <RevenueLabelFormRD/>
    <ChartFormRD/>
      </div>
  </div>
  )
}

export default RevenueDetailedPage