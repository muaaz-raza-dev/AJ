import { useAppSelector } from "@/app/ReduxHooks"
import RegFormWrapper from "./FormWrapper.reg"
import { useFormContext } from "react-hook-form"
import { Label } from "@/shdcn/components/ui/label"
import { FC, useEffect } from "react"
import RegLabelWrapper from "./LabelWrapper.reg"
import { Radio } from "antd"

const One_TimeFee_DetailForm = () => {
    let {GlobalFees} =useAppSelector(s=>s.global)
  return (
    <RegFormWrapper title="One Time Fee confirmation" >
    <div className="flex gap-x-4 py-4  px-4 ">
        {
            Object.entries(GlobalFees).map((e,i)=> (
                <RegLabelWrapper className="w-[48%] !flex-row gap-5" title={e[1]}>
            <AdmissionFeePaidRadio fieldName={`FinancialDetails[${i}]`} Id={e[0]} />
        </RegLabelWrapper>
)
            )
        }
    </div>
   </RegFormWrapper>
  )
}

const AdmissionFeePaidRadio :FC<{fieldName:string;Id:string}>=({fieldName,Id})=>{
    let {watch,setValue} = useFormContext()
    let watched = watch(`${fieldName}.paid`) 
    useEffect(() => {
        setValue(`${fieldName}.paymentConfigId`,Id)  
        setValue(`${fieldName}.paid`,false  )   
    }, [])
    return (
        <Radio.Group value={`${watched}`} onChange={({target:{value}})=>setValue(`${fieldName}.paid`,value=="true")}>
            <Radio value={'true'} id="option-one" >
     <Label htmlFor="option-one">Paid</Label>
            </Radio>
            <Radio value={'false'} id="option-two" >
     <Label htmlFor="option-two">Not Paid</Label>
            </Radio>
        </Radio.Group>
//         <RadioGroup  onValueChange={(e)=>{
//             setValue(`${fieldName}.paid`,e=="true")
//         }   
//    } value={`true`} className="flex"  >
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={'true'} id="option-one" />
//     <Label htmlFor="option-one">Paid</Label>
//   </div>
//   <div className="flex items-center space-x-2">
//     <RadioGroupItem value={"false"} id="option-two" />
//     <Label htmlFor="option-two">Not Paid</Label>
//   </div>
//   </RadioGroup>
    )
  }
export default One_TimeFee_DetailForm