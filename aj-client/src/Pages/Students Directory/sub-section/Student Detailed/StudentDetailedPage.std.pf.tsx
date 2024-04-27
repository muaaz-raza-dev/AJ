import { Route, Routes } from "react-router-dom"
import StudentProfileOverviewSection from "./Components/Sections/Profile Overview/StudentProfileOverviewSection.std.pf"
import ProfileStdConfidentialInfoPage from "./Components/Sections/Sub-Pages/ProfileStdConfidentialInfoPage.std.pf"
import EditStdDetailsPage from "./Components/Sections/Edit_Student/EditStddetailsPage.std.pf"
import ErrorPage from "@/Global/Loaders/ErrorPage"
import { useAppSelector } from "@/app/ReduxHooks"
import useFetchStudentMeta from "@/Hooks/Read Student Exclusive/useFetchStudentMeta"
import StudentDetailedSkeletonLoader from "./StudentDetailedSkeletonLoader"
const StudentDetailedPage = () => {
let {isError,isFetched,isLoading} = useAppSelector(s=>s.stdExclusive)
useFetchStudentMeta()
if(isError!=""&&!isFetched)return <ErrorPage message="The student you're looking for is not exist" navigate="/students"/>
if(isLoading) return <StudentDetailedSkeletonLoader/>

  return (
    
    <Routes>
      <Route index path="/" element={
        <div className="flex gap-x-3 ">
      <div className="w-[65%] flex flex-col gap-2">
<ProfileStdConfidentialInfoPage/>
      </div>
      <div className="w-[35%] bg-slate-50 ">
        <StudentProfileOverviewSection/>
      </div>
    </div>
    }/>
    <Route path="/edit" element={<EditStdDetailsPage/>} />
    </Routes>
  )
}

export default StudentDetailedPage
