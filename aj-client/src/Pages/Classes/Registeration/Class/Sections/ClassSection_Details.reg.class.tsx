import { useFormContext } from "react-hook-form"
import ClassSections_Block from "./ClassSections_Block.reg.class"
import { Button } from "@/shdcn/components/ui/button"
import { defaultSection_Class } from "@/app/Types/Iclass"

const ClassSection_Details = () => {
    let {watch,setValue} =useFormContext()
    let sections =watch("sections")
    let handleSectionAddition = ()=>{
        setValue("sections",[...sections,defaultSection_Class])
    }
  return (
        sections?.map(( _:any,index:number)=>{
          return<>
             <ClassSections_Block index={index} /> 
              {
          index == sections.length-1 &&
             <div className='w-full flex items-center px-4 my-1 '>
                <Button className="bg-dark text-white border shadow border-dark hover:text-dark" type='button' 
                onClick={handleSectionAddition}>
                 Add Section
                </Button>
      </div>
             }
             </>
        })
    
  )
}

export default ClassSection_Details