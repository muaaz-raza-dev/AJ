import { Button } from "@/shdcn/components/ui/button"
import LabelWrapper from "../Helpers/LabelWrapper.dash"
import { MdCancel } from "react-icons/md"
import React, { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const Certification_Select = () => {
    let {setValue} = useFormContext()
    const [Options , setOptions] =useState<{input:string,selected:string[]}>({input:"",selected:[]})
    const handleInput = ({target:{value}}:React.ChangeEvent <HTMLInputElement>)=>{
        setOptions(prev_value=>({...prev_value,input:value}))
    }
    const handleOptions = () =>{
        setOptions(prev_value=>({input:"",selected:[...prev_value.selected,prev_value.input]}))
        }
    const handleDelete = (id:number)=> {
        setOptions(prev_value=>({...prev_value,selected:prev_value.selected.filter((_,index)=>index!=id)}))
    }
    useEffect(() => {
    setValue("courses",Options.selected)
    }, [Options.selected])
  return (
    <LabelWrapper required label="Certifications" className="w-full ">
        <section className="w-full flex gap-2 flex-col">
        <div className="flex gap-x-2 w-[50%]">
        <input value={Options.input} type="text" placeholder="Iot & Robotics" id="Certifications"  
    className=" border rounded-md  w-[95%] p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    onChange={handleInput}
    />
    <Button disabled={!Options.input} type="button" onClick={handleOptions} className="bg-dark text-white border border-dark hover:text-dark">Add</Button>
        </div>
        <div className=" w-full rounded flex gap-2 ">
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

export default Certification_Select