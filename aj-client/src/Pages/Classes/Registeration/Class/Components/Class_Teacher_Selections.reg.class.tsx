import { useAppSelector } from "@/app/ReduxHooks"
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import { FC, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
const Class_Teacher_Selections:FC<{index:number}> = ({index}) => {
    let {setValue,watch} = useFormContext()
    let ClassTeacher =watch(`sections[${index}].ClassTeacher`)
    let teachers =useAppSelector(s=>s.dashboard.RequiredInfo.Teachers) 
    const [state,setState]=useState(ClassTeacher||Object.keys(teachers)[0])
    useEffect(() => {
    setValue(`sections[${index}].ClassTeacher`,teachers[state])
    }, [state])
    
  return (
    <LabelWrapper required label="Class Teacher " >
        <section className="w-full flex gap-2 flex-col h-full">
    <CustomSelect_Reg data={Object.keys(teachers)} nosearch placeholder="ClassTeacher" setState={setState} state={
     ClassTeacher ? Object.entries(teachers).find(e=>e[1]==ClassTeacher)?.[0] ||"" :""
      } />
        </section>
  </LabelWrapper>
  )
}

export default Class_Teacher_Selections