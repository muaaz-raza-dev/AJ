import { Controller, useFormContext } from "react-hook-form"
import RegLabelWrapper from "../LabelWrapper.reg"
import { Input, Select} from "antd"
import { Label } from "@/shdcn/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shdcn/components/ui/radio-group"

const FinancialInfoForm = () => {
    let {control} = useFormContext()
  return (
    <div className="flex w-full flex-wrap gap-x-4 gap-y-6">
    <RegLabelWrapper className="w-[48%]" title="Admission Fee">
    <Controller  name="FinancialDetails.AdmissionFee.amount" control={control} render={({field,fieldState:{error}})=>
     ( 
     <>
     <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))}  placeholder={"100000"} addonAfter={
<AdmissionFeePaidRadio/>

     } className="active:border-[var(--dark)]"/>
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
     <Input type="number" {...field}   onChange={(e) => field.onChange(parseFloat(e.target.value))}  placeholder="100000" addonAfter={<Select defaultValue={"pkr"}><Select.Option value={"pkr"}>PKR</Select.Option></Select>} className="active:border-[var(--dark)]"/>
     {
          error && <p className="text-red-500 text-xs">{error.message}</p>
        }
     </>
)}/>
  </RegLabelWrapper>
  </div>
  )
}
const AdmissionFeePaidRadio=()=>{
  let {watch,setValue} = useFormContext()
  let watched = watch("FinancialDetails.AdmissionFee.paid") 
  return (
 <RadioGroup  onValueChange={(e)=>{setValue("FinancialDetails.AdmissionFee.paid",e=="true")}} value={`${watched}`} className="flex"  >
<div className="flex items-center space-x-2">
  <RadioGroupItem value={'true'} id="option-one" />
  <Label htmlFor="option-one">Paid</Label>
</div>
<div className="flex items-center space-x-2">
  <RadioGroupItem value={"false"} id="option-two" />
  <Label htmlFor="option-two">Not Paid</Label>
</div>
</RadioGroup>
  )
}
export default FinancialInfoForm
