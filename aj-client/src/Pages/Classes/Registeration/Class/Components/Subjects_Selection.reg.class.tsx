import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash"
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash"
import { Button } from "@/shdcn/components/ui/button"
import { commonSubjects } from "../../Teacher/Data/Roles"
import { MdCancel } from "react-icons/md"
const Subjects_Selection = () => {
    let {setValue} = useFormContext()
    const [Options , setOptions] =useState<{input:string,selected:string[]}>({input:"Science",selected:[]})
    const handleInput = (value:string)=>{
        console.log(value)
        setOptions(prev_value=>({...prev_value,input:value}))
    }
    const handleOptions = () =>{
        setOptions(prev_value=>({input:"",selected:[...prev_value.selected,prev_value.input]}))
        }
    const handleDelete = (id:number)=> {
        setOptions(prev_value=>({...prev_value,selected:prev_value.selected.filter((_,index)=>index!=id)}))
    }
    useEffect(() => {
        setValue("subjects",Options.selected)
    }, [Options.selected])
  return (
    <LabelWrapper required label="Subjects " >
        <section className="w-full flex gap-2 flex-col">
        <div className="flex gap-x-2 w-full">
    <CustomSelect_Reg data={commonSubjects} placeholder="Teaching Subjects" setState={handleInput} state={Options.input}  />
    <Button type="button" disabled={!Options.input} onClick={handleOptions} className="bg-dark text-white border border-dark hover:text-dark">Add</Button>
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