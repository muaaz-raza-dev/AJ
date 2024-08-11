import { useAppSelector } from "@/app/ReduxHooks"
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import { FC, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
const Class_Teacher_Selections:FC<{index:number}> = ({index}) => {

    let {setValue,watch} = useFormContext()
    let ClassTeacher =watch(`sections[${index}].ClassTeacher`)
    let teachers =useAppSelector(s=>s.dashboard.RequiredInfo.Teachers) 
    let isTeacherDetails = watch(`sections[${index}].isSubTeacherDetails`)
    const [state,setState]=useState(ClassTeacher||Object.keys(teachers)[0])
    
    useEffect(() => {
    setValue(`sections[${index}].ClassTeacher`,teachers[state])
    }, [state])

    useEffect(() => {
    setState(Object.keys(teachers)[0])
    }, [teachers])

  if(isTeacherDetails){
    return (
      <LabelWrapper  label="Class Teacher "  className="max-sm:w-full">
      <section className="w-full flex gap-2 flex-col h-full">
    <CustomSelect_Reg optimumData={Object.entries(teachers).map(e=>({label:e[0],value:e[1]}))} nosearch placeholder="ClassTeacher" setState={setState}
     state={ ClassTeacher } />
      </section>
  </LabelWrapper>
  )
}
}

export default Class_Teacher_Selections