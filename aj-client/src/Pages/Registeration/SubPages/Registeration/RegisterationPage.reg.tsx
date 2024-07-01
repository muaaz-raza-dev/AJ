import { useAppSelector } from "@/app/ReduxHooks"
import RegisterationFormFile from "./RegisterationFormFile.reg"

const StudentRegisterationPage = () => {
  let {totalStudents} = useAppSelector(state=>state.global)
  return (
    <main className="flex flex-col  my-2">
      <b className="box bg-gradient-to-tr self-end py-2 rounded-md hFont">
        <span className="text-[var(--dark)]">
        {totalStudents} students registered
        </span>
        </b>
  <RegisterationFormFile/>
    </main>
  )
}

export default StudentRegisterationPage
