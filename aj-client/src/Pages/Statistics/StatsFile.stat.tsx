import Charts from "./Components/Charts/Charts.stat"
import FilterableStatsSection from "./Components/Filterable Stats/FilterableStatsSection.stat"
import Header from "./Components/Header/Header.stat"
import useFetchGeneralStats from "@/Hooks/Stats/useFetchGenralStats"
import SkeletonStatsFile from "./SkeletonStatsFile.stat"

const StatsFile = () => {
let {isLoading} =useFetchGeneralStats()
if(isLoading) return <SkeletonStatsFile/>
  return (
<main className='flex flex-col gap-4'>
<Header/>
<FilterableStatsSection/>
<Charts/>
</main>
  )
}

export default StatsFile