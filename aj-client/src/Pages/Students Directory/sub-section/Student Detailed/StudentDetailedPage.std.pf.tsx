import StudentProfileOverviewSection from "./Components/Profile Overview/StudentProfileOverviewSection.std.pf"
const StudentDetailedPage = () => {
  return (
    <div className="flex gap-x-3">
      <div className="w-[65%]">
        {/* <StudentProfileHeader/> */}
      </div>
      <div className="w-[35%] bg-slate-50 ">
        <StudentProfileOverviewSection/>
      </div>
    </div>
  )
}

export default StudentDetailedPage
