import SkeletonStatsFile from "@/Pages/Statistics/SkeletonStatsFile.stat"
import FilterBar from "./Components/FiterBar.std.repo"
import useFetchStdFeeReportMeta from "@/Hooks/Student Fee Report/useFetchStdFeeReportMeta"
import StudentListSection from "./Components/StudentListSection.std.repo"
import AmountInfoBoxes from "./Components/AmountInfoBoxes.std.repo"

const StudentFeeReportPage = () => {
const {isLoading} =  useFetchStdFeeReportMeta()
if(isLoading) return <SkeletonStatsFile/>
  return (
    <div className="w-full  flex flex-col gap-2 ">
      <div className="flex flex-wrap gap-4 w-full p-4 rounded-md items-center bg-dark  dark:bg-dark dark:text-white shadow-inner ">
        <FilterBar />
      </div>
  <AmountInfoBoxes/>
  <StudentListSection/>
    </div>
    
  )
}

export default StudentFeeReportPage