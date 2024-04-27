import { Controller, useFormContext } from "react-hook-form";
import RegLabelWrapper from "../LabelWrapper.reg";
import { FC, useEffect } from "react";
import { Input } from "antd";


const DateOfAdmissionField:FC<{edit?:boolean}> = ({edit}) => {
    let {control,watch,setValue}=useFormContext()
    const NewAdmission = watch("NewAdmission")
useEffect(() => {
!edit&&NewAdmission==true&&setValue("DOA",new Date().toISOString().substring(0, 10))
}, [NewAdmission]);
  return (
    <RegLabelWrapper className="w-[48%]" title="Date of Admission" >

      <Controller name="DOA" control={control}
      rules={{required:"Date of admission is required"}}
       render={({field,fieldState:{error}})=>{
         return <>
          <Input {...field}
className="active:border-[var(--dark)]"  type="date"/>
            { error && <p className="text-red-500 text-xs">{error.message}</p>}
</>
        }}/>
     
    </RegLabelWrapper>
  )
}

export default DateOfAdmissionField
