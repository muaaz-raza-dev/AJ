import { useFetchTeacherNames } from "@/Hooks/Teacher&Class/useReadTeachers"
import ClassRegisterationForm from "./Form/ClassRegisterationForm.class"

const ClassRegisterationFile = () => {
  useFetchTeacherNames()
  return (
    <div className="w-full flex flex-col gap-y-4">
        <ClassRegisterationForm/>
        </div>
  )
}

export default ClassRegisterationFile