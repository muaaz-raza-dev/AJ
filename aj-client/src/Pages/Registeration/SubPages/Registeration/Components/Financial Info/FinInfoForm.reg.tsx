import { Controller, useFormContext } from "react-hook-form"
import RegLabelWrapper from "../LabelWrapper.reg"
import { Input, Select } from "antd"

const FinancialInfoForm = () => {
    let {control} = useFormContext()
  return (
    <div className="flex w-full flex-wrap gap-x-4 gap-y-6">
    <RegLabelWrapper className="w-[48%]" title="Admission Fee">
    <Controller  name="FinancialDetails.AdmissionFee" control={control} render={({field,fieldState:{error}})=>
     ( 
     <>
     <Input type="number" {...field}  placeholder="100000" addonAfter={<Select defaultValue={"pkr"}><Select.Option value={"pkr"}>PKR</Select.Option></Select>} className="active:border-[var(--dark)]"/>
     {
          error && <p className="text-red-500 text-xs">{error.message}</p>
        }
     </>
)}/>
  </RegLabelWrapper>
  <RegLabelWrapper className="w-[48%]" title="Monthly Fee">
    <Controller rules={{required:"Monthly Fee is Required"}} name="FinancialDetails.MonthlyFee" control={control} render={({field,fieldState:{error}})=>
     ( 
     <>
     <Input type="number" {...field}  placeholder="100000" addonAfter={<Select defaultValue={"pkr"}><Select.Option value={"pkr"}>PKR</Select.Option></Select>} className="active:border-[var(--dark)]"/>
     {
          error && <p className="text-red-500 text-xs">{error.message}</p>
        }
     </>
)}/>
  </RegLabelWrapper>
  <RegLabelWrapper className="w-[48%]" title="Annual Charges">
    <Controller  name="FinancialDetails.AnnualCharges" control={control} render={({field,fieldState:{error}})=>
     ( 
     <>
     <Input type="number" {...field}  placeholder="100000" addonAfter={<Select defaultValue={"pkr"}><Select.Option value={"pkr"}>PKR</Select.Option></Select>} className="active:border-[var(--dark)]"/>
     {
          error && <p className="text-red-500 text-xs">{error.message}</p>
        }
     </>
)}/>
  </RegLabelWrapper>
  </div>
  )
}

export default FinancialInfoForm
