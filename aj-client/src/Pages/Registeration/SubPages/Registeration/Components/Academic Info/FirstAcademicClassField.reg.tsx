import { Input } from "antd"
import RegLabelWrapper from "../LabelWrapper.reg"
import { useFormContext } from "react-hook-form"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"

const FirstAcademicClassField = () => {
  let form =useFormContext<IRegisterFormState>()
    const firstAdmittedClass = form.watch("firstAdmittedClass")
    const NewAdmission = form.watch("NewAdmission")
    if(!NewAdmission){

      return (
        <RegLabelWrapper className="w-[48%]" title="First Acedmic Class">
    <Input
    value={firstAdmittedClass}
    onChange={(e) => form.setValue("firstAdmittedClass", e.target.value)}
    placeholder="KG-I"
    className="active:border-[var(--dark)] dark:bg-dark dark:border-darker dark:text-white dark:placeholder:text-gray-600"
    />
  </RegLabelWrapper>
  )
}
}

export default FirstAcademicClassField