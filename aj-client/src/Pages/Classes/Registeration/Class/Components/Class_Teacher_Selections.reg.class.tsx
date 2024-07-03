import { useAppSelector } from "@/app/ReduxHooks"
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import { FC, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const Class_Teacher_Selections:FC<{index:number}> = ({index}) => {
    let {setValue} = useFormContext()
    let teachers =useAppSelector(s=>s.dashboard.Teachers_value_pairs)
    const [state,setState]=useState(Object.keys(teachers)[0])
    useEffect(() => {
    setValue(`sections[${index}].ClassTeacher`,teachers[state])
    }, [state])
  return (
    <LabelWrapper required label="Class Teacher " className="w-full">
        <section className="w-full flex gap-2 flex-col h-full">
    <CustomSelect_Reg data={Object.keys(teachers)} nosearch placeholder="ClassTeacher" setState={setState} state={state} />
        </section>
  </LabelWrapper>
  )
}

export default Class_Teacher_Selections