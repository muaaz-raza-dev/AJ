import { FC, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import { Button } from "@/shdcn/components/ui/button"
import { commonSubjects } from "../../Teacher/Data/Roles"
import { MdCancel } from "react-icons/md"
import { isFormReset } from "../Sections/Class_Basic_Details.reg.class"
import { AutoComplete } from "antd"

const Subjects_Selection:FC<{index:number}> = ({index}) => {
    let {setValue,watch} = useFormContext()
    let selected =watch(`sections[${index}].subjects`) as string[]
    const [Options , setOptions] =useState<{input:string,selected:string[]}>({input:"Science",selected:selected})

    const handleInput = (value:string)=>{
        setOptions(prev_value=>({...prev_value,input:value}))
    }
    const handleOptions = () =>{
        
        setOptions(prev_value=>({input:"",selected:[...prev_value.selected,prev_value.input]}))
        }
    const handleDelete = (id:number)=> {
        setOptions(prev_value=>({...prev_value,selected:prev_value.selected.filter((_,index)=>index!=id)}))
    }
    useEffect(() => {
        setValue(`sections[${index}].subjects`,Options.selected)
    }, [Options.selected])
    
 
    useEffect(() => {  //To sync the reset of form with the fields
        if(isFormReset(selected,Options.selected)){
            setOptions(prev_value=>({...prev_value,selected:selected}))
        }
    }, [selected])
  return (
    <LabelWrapper required label="Subjects " className="w-full">
        <section className="w-full flex gap-2 flex-col">
        <div className="flex gap-x-2 w-full">
    <AutoComplete className={`w-full h-full antd-selectBar`} filterOption={(value,options)=>options?.value.includes(value)||false} options={commonSubjects.map(e=>({value:e}))} value={Options.input} onChange={handleInput} placeholder="Subjects"  />
    <Button type="button" disabled={!Options.input} onClick={handleOptions} className="bg-dark dark:bg-darker text-white border border-dark hover:text-dark">Add</Button>
        </div>
        <div className=" w-full rounded flex gap-2 flex-wrap">
             {
                Options.selected.map((e,id)=>{
                    return <div key={id+e} className="border-2 rounded-md border-dark text-dark w-max px-3 py-1 flex gap-2">
                <p>
                {e}
                </p>
                <button onClick={()=>handleDelete(id)} type="button" className="hover:scale-110 transition-all hover:text-red-500"><MdCancel/></button>
            </div>
                })
             }
        </div>
        </section>
  </LabelWrapper>
  )
}

export default Subjects_Selection