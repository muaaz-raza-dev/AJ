import ExportStudentFeeReport from "./ExportStudentFeeReport.std.repo"
import StudentListTable from "./StudentListTable.std.repo"
import { useAppSelector } from "@/app/ReduxHooks"

const StudentListSection = () => {
  const {payload,isLoading} = useAppSelector(s=>s.stdFeeReport)
  const StatusColor = payload.status== "No Fees" ? "bg-gray-800 text-white" : ( payload.status=="Pending"? "bg-danger text-white": "bg-[var(--info)]" )
  return (
    <div className="pl-2 flex flex-col gap-4">
      
    <div className="flex  py-2 w-full items-center justify-between">
      <div className = "flex gap-4">
      <h1 className="text-2xl font-bold hFont text-dark ">Students List</h1>
      {
        payload.status != "Pending" &&
         <div className={`${StatusColor} text-black rounded-full font-bold px-3 py-1 w-max`}>
        {payload.status}
         </div>
      }
      {
        !isLoading &&
      <div className="rounded-md bg-darker text-white px-4 py-1">
        {payload.students.length} Students
      </div>
      }
        </div>
      <ExportStudentFeeReport/>
    </div>

<StudentListTable/>

    </div>
  )
}

export default StudentListSection