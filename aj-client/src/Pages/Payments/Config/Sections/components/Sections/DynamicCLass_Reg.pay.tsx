import CustomInputs_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomInputs_Reg.dash';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronsUpDown } from 'lucide-react';
import  { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form';

const DynamicCLass_Reg = () => {
  let form = useFormContext()
  let Classes  =  form.watch("payload.classes")
  let session = form.watch("payload.session")
  
  return (
    <section className="flex flex-col gap-1 px-2 bg-[var(--box)] rounded-md dark:bg-dark dark:text-white py-2">
      <HeaderClassSection/>
        <div className="flex gap-2 flex-wrap w-full">
      {
        !session ?
        <div className=" py-2 font-bold text-xl text-gray-500 w-full center text-center hFont  ">
          No yearly session selected .
        </div>
        :
        Classes?.length ==0 ?
        <div className=" py-2 font-bold text-xl text-red-400 w-full center text-center hFont  ">
        No Class registered in this session .
      </div>
        :
        
        Classes?.map((val:{label:string , value:string} ,i:number)=> ( <EachClassAmountCollapsable class_name={val.label}
          key={val.value} classId={val.value} feild_name={`payload.classes[${i}].amount`}  Feild_parent={`payload.classes[${i}]`}/> ))
        }
 </div>
        </section>
  ) 
}

const HeaderClassSection = ()=>{
  let form = useFormContext() 
  let classes= form.getValues("payload.classes")
  let handleAllAmounts = (val:string)=>{
 form.setValue("payload.classes",classes.map((e:any)=>({...e,amount:+val})))
  }
  
return <div className=" py-2 flex justify-between items-center px-4">
  <h1 className='font-bold text-xl text-darker hFont  dark:text-white'>
      Classes
    </h1>
    {Array.isArray(classes)&&classes.length!=0&& form.watch("payload.feeStatus")!="Same amount for every Class"&&
    <input
    type='number'
    placeholder='Write amount to apply to all classes then modify them.'
    onChange={({target:{value}})=>handleAllAmounts(value)}
    className=" border rounded-md   min-w-[40%] p-2 bg-transparent dark:bg-darker dark:text-white dark:border-darker  border-[#8080806b] text-xs focus:border-dark  transition-all outline-none "
    />
  }
    </div>
}


const EachClassAmountCollapsable:FC<{feild_name:string;classId?:string;class_name:string,Feild_parent?:string}> =({feild_name,class_name,Feild_parent,classId})=>{
  let form =useFormContext()
  useEffect(() => {
    form.setValue(`${Feild_parent}.classId`,classId)
  }, [])
    
    return  <Collapsible className="w-[49%] max-md:w-full rounded-lg p-1  px-4 h-max transition-all" >
    <CollapsibleTrigger className="w-full  !gap-y-1 items-center flex  py-1  justify-between">
    <h1 className=" text-gray-600 dark:text-gray-300 !font-bold hFont  ">Class {class_name} (Amount)</h1>
    <button type="button" className="hover:bg-light dark:hover:text-dark text-black dark:text-white rounded-md px-2 transition-colors"> 
      <ChevronsUpDown  size={20} /> </button>
    </CollapsibleTrigger>
    <CollapsibleContent className="py-1">
           <CustomInputs_Reg formContext={form} value={form.watch(feild_name)} type='number'
             className="w-1/2 !bg-transparent !text-white !text-xs"  field_name={feild_name} placeholder="1500 "/>
    </CollapsibleContent>

  </Collapsible>
}
export default DynamicCLass_Reg