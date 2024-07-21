import useFetchStdHistoryMeta from "@/Hooks/Student History/useFetchStdHistoryMeta"
import ClassHistorySection from "./Sections/Class history/ClassHistorySection.his"
import FeeHistorySection from "./Sections/Fee history/FeeHistorySection.his"
import FilterBar from "./Sections/Filterbar/FilterBar.his"
import HistoryFileHeaderSection from "./Sections/Header/HistoryFileHeaderSection.his"

const StudentHistoryFile = () => { 
  useFetchStdHistoryMeta()
  return (
    <main className="flex flex-col gap-6 w-full">
      <HistoryFileHeaderSection/> 
      <FilterBar/>
      <FeeHistorySection/>
      <ClassHistorySection/>     
    </main>
  )
} 


export default StudentHistoryFile