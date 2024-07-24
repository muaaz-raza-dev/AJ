import ClassRegisterationForm from "./Form/ClassRegisterationForm.class"
import { FC } from "react"

const ClassRegisterationFile :FC<{edit?:boolean}>= ({edit}) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
        <ClassRegisterationForm edit ={edit}/>
        </div>
  )
}

export default ClassRegisterationFile