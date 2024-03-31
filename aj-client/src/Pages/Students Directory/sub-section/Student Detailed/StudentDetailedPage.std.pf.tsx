// import StudentProfileHeader from "./Components/StudentProfileOverView.std.pf"

import StudentProfileOverView from "./Components/Profile Overview/StudentsOverViewHeader.std.pf"


const StudentDetailedPage = () => {
  return (
    <div className="flex gap-x-3">
      <div className="w-[60%]">
        {/* <StudentProfileHeader/> */}
      </div>
      <div className="w-[40%] bg-slate-50">
<StudentProfileOverView/>
      </div>
    </div>
  )
}

export default StudentDetailedPage
