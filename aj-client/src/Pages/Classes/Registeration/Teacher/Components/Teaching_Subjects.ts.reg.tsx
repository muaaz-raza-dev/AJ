import { Button } from "@/shdcn/components/ui/button"
import { commonSubjects } from "../Data/Roles"
import CustomSelect_Reg from "../Helpers/CustomSelect_Reg.dash"
import LabelWrapper from "../Helpers/LabelWrapper.dash"
import { MdCancel } from "react-icons/md"
import { useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"

const Teaching_Subjects = () => {
    let {setValue} = useFormContext()
    const [Options , setOptions] =useState<{input:string,selected:string[]}>({input:"",selected:[]})
    const handleInput = (value:string)=>{
        console.log(value);
        
        setOptions(prev_value=>({...prev_value,input:value}))
    }
    const handleOptions = () =>{
        setOptions(prev_value=>({input:"",selected:[...prev_value.selected,prev_value.input]}))
        }
    const handleDelete = (id:number)=> {
        setOptions(prev_value=>({...prev_value,selected:prev_value.selected.filter((_,index)=>index!=id)}))
    }
    useEffect(() => {
        setValue("teaching_subjects",Options.selected)
    }, [Options.selected])
  return (
    <LabelWrapper required label="Teaching Subjects" >
        <section className="w-full flex gap-2 flex-col">
        <div className="flex gap-x-2 w-full">
    <CustomSelect_Reg data={commonSubjects} placeholder="Teaching Subjects" setState={handleInput} state={Options.input} />
    <Button type="button" disabled={!Options.input} onClick={handleOptions} className="bg-dark text-white border border-dark hover:text-dark">Add</Button>
        </div>
        <div className=" w-full rounded flex gap-2 flex-wrap">
             {
                Options.selected.map((e,id)=>{
                    return <div className="border-2 rounded-md border-dark text-dark w-max px-3 py-1 flex gap-2">
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

export default Teaching_Subjects