import { Checkbox } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import lod from "lodash"
export interface IpaymentMonths
{
isPayment: boolean;
year: string;
month: string;
dueDate: string; // Required
paymentDate: string; // Required
index?:string
    }

const MonthsPay_Red = () => {
    let form  =useFormContext()
    let paymentMonths = form.watch("payload.paymentMonths")
    let FeeFrequency = form.watch("payload.feeFrequency")
    
    const [Grouped, setGrouped] = useState<{[key:string]:IpaymentMonths[]}>({})
    let session = form.watch("payload.session")
    useEffect(() => {
        setGrouped( lod.groupBy(paymentMonths?.map((e:any,i:number)=>({...e,index:i}))||[],({year})=>{
            return year
        }));
        }, [paymentMonths])
if(FeeFrequency == "Monthly" ||FeeFrequency == "Custom") { 
    return (
        <div className="flex flex-col bg-[var(--box)] p-4 w-full">
    <h1 className="text-darker  !font-bold hFont text-xl pb-2 "> Select Months of payments </h1>
    <div className="flex flex-col gap-2 w-full">
        {
            
!session ?
<div className=" py-2 font-bold text-xl text-gray-500 w-full center text-center hFont  ">
  No yearly session selected .
</div>
:
            Object.entries(Grouped).map((val)=>{
                return <div className="flex flex-col gap-2">
                <h2 className="text-dark font-semibold text-xl ">{val[0]}</h2>
            <div className="flex flex-wrap gap-4 w-full">
                {val[1].map((e:IpaymentMonths) => <CustomCheckbox label={e.month} field_name={`payload.paymentMonths[${e?.index}].isPayment`}/>)}
            </div>         
            </div>         
            })
        }
   
    
    </div>
    </div>
  )
}
}

const CustomCheckbox:FC<{label:string,field_name:string}> = ({label,field_name})=>{
    let form =useFormContext()
    let value =form.watch(field_name)
    return(
        <div className="flex text-lg items-center space-x-2">
<Checkbox id={label} checked={value} className="bg-[var(--primary)] text-black" onChange={({target:{checked}})=>form.setValue(field_name,checked)}/>
<label
htmlFor={label}
className="text-lg font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
>
    {label}
</label>
</div>
    )
}
export default MonthsPay_Red