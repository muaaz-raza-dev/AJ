import useFetchStdHistoryMeta from "@/Hooks/Student History/useFetchStdHistoryMeta"
import ClassHistorySection from "./Sections/Class history/ClassHistorySection.his"
import FeeHistorySection from "./Sections/Fee history/FeeHistorySection.his"
import FilterBar from "./Sections/Filterbar/FilterBar.his"
import HistoryFileHeaderSection from "./Sections/Header/HistoryFileHeaderSection.his"
import NotFoundValidator from "@/Api/404Validator"
import ErrorPage from "@/Global/Loaders/ErrorPage"
import StudentDetailedSkeletonLoader from "../Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader"

const StudentHistoryFile = () => { 
 const {isLoading,error,isError} = useFetchStdHistoryMeta()
 if(isError&&NotFoundValidator(error))return <ErrorPage title="Student not found" message="The student you're looking for is not exist" navigate="/students"/>
 if(isLoading) return <StudentDetailedSkeletonLoader/>
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