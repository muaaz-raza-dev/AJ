import { Controller, useFormContext } from "react-hook-form";
import RegLabelWrapper from "../LabelWrapper.reg";
import { useEffect } from "react";
import { Input } from "antd";


const DateOfAdmissionField = () => {
    let {control,watch,setValue}=useFormContext()
    const NewAdmission = watch("NewAdmission")
useEffect(() => {
NewAdmission==true&&setValue("DOA",new Date().toISOString().substring(0, 10))
}, [NewAdmission]);
  return (
    <RegLabelWrapper className="w-[48%]" title="Date of Admission" >

      <Controller name="DOA" control={control}
      rules={{required:"Date of admission is required"}}
       render={({field,fieldState:{error}})=>{
         return <>
          <Input {...field}
          disabled={NewAdmission}
className="active:border-[var(--dark)]"  type="date"/>
            { error && <p className="text-red-500 text-xs">{error.message}</p>}
</>
        }}/>
     
    </RegLabelWrapper>
  )
}

export default DateOfAdmissionField
