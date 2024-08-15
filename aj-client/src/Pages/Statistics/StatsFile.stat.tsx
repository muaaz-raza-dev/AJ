import Charts from "./Components/Charts/Charts.stat"
import FilterableStatsSection from "./Components/Filterable Stats/FilterableStatsSection.stat"
import Header from "./Components/Header/Header.stat"
import useFetchGeneralStats from "@/Hooks/Stats/useFetchGenralStats"
import SkeletonStatsFile from "./SkeletonStatsFile.stat"
import { Route, Routes } from "react-router-dom"
import StudentFeeReportPage from "../Transactions/Sub pages/Student Fee Report/StudentFeeReportPage.std.repo"
import RevenueDetailedPage from "./Revenue detailed/RevenueDetailedPage.stat"

const StatsFile = () => {
let {isLoading} =useFetchGeneralStats()
if(isLoading) return <SkeletonStatsFile/>
return (
<Routes>
<Route index element={
<main className='flex flex-col gap-4'>
<Header/>
<FilterableStatsSection/>
<Charts/>
</main>
}
/>

<Route element={<StudentFeeReportPage />} path="/feereport"/> 
<Route element={<RevenueDetailedPage/>} path="/revenue"/> 
</Routes>
  )
}

export default StatsFile