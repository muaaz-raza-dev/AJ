import CustomSelect_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash'
import LabelWrapper from '@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IpaymentMonths } from './Sections/MonthsPay_Red.pay'
import moment from 'moment'
import CustomDateSelector_Reg from '@/Pages/Classes/Registeration/Teacher/Helpers/CustomDateSelector_Reg.dash'
import { Button } from '@/shdcn/components/ui/button'
import lod from "lodash";

export const Payment_Dates_Reg_Sections = ()=>{
    let form = useFormContext()
    let  feeFrequecy = form.watch("payload.feeFrequency")
   if(feeFrequecy =="Monthly") {
       return  <Payment_Dates_Monthly/>
    }
    else if(feeFrequecy =="Yearly") {
return <Payment_Dates_Yearly/>
    }
    else if(feeFrequecy =="Custom") {
        return  <Payment_Dates_Monthly/>
    }
}



const Payment_Dates_Yearly = () => {
    let {watch,setValue} = useFormContext()
    const [Error, setError ] =useState({type:"start",error:"",isError:false})
    let paymentDate = watch("payload.paymentDate")
    let dueDate =watch("payload.dueDate")
    let selectedSession  =watch("filters.sessions.SelectedSession")
    let onChangePaymentDate = (val:string)=>{
        let selectedDate  = moment(val)
        let session_start_date  = moment(selectedSession?.start_date)
        if(session_start_date.isBefore(selectedDate)){
            setValue("payload.paymentDate",moment(val).toISOString())
            setError(e=>({...e,error:"",isError:false}))
            
        }
        else {
            setError({type:"start",error:`Payment date should be after Session's start date . Session Started at ${session_start_date.format("D MMMM Y")}`,isError:true})
        }
    }
    let onChangedueDate = (val:string)=>{
        let selectedDate  = moment(val)
        let session_end_date  = moment(selectedSession?.end_date)
        console.log(selectedSession);
        
        if(session_end_date.isAfter(selectedDate)){
        setValue("payload.dueDate",moment(val).toISOString()) 
        setError(e=>({...e,error:"",isError:false}))
    }
        else {
            setError({type:"end",error:`Due date should be before session end date. Session will be ended at ${session_end_date.format("D MMMM Y")}`,isError:true})

        }
    }
    let Reset = (mode:string)=>{
        if(mode == "paymentDate"){
            setValue("payload.paymentDate","")
        }
        else if(mode == "dueDate"){
            setValue("payload.dueDate","")
        }
        setError(e=>({...e,error:"",isError:false}))

    }
    return (
        <div className="w-full flex flex-col  gap-2 bg-[var(--box)] p-4">
<LabelWrapper
  className="w-full"
  labelClassName="text-base font-semibold "
  label="Payment Date"
>
<div className="flex gap-2 w-full">
    <CustomDateSelector_Reg required className='w-[83%]'  formValue={paymentDate} label='Pick the date of when payment is started'  onChange={onChangePaymentDate}/>
    <Button type='button' onClick={()=>Reset("paymentDate")} className='bg-[var(--primary)] w-[15%] text-dark'>Reset</Button>
    </div>
    {Error.isError&&Error.type=="start" && <p className='text-red-600 text-sm font-medium'>{Error.error}</p>}
  </LabelWrapper>
  <LabelWrapper
  className="w-full "
  labelClassName="text-base font-semibold "
  label="Due Date"
>
    <div className="flex gap-2 w-full">
<CustomDateSelector_Reg className='w-[83%]'  formValue={dueDate} label='Pick the date of when payment is ended'  onChange={onChangedueDate}/>
<Button type='button' onClick={()=>Reset("dueDate")}  className='bg-[var(--primary)] w-[15%] text-dark'>Reset</Button>
    </div>
    {Error.isError&&Error.type=="end" && <p className='text-red-600 text-sm font-medium'>{Error.error}</p>}
</LabelWrapper>
    </div>
    )
}


const Payment_Dates_Monthly = () => {
    let startOptions = ["1st of the month","10th of the month" ]
    let endOptions = ["last day of the month","10th of the next month"]
    const [Start, setStart] = useState(startOptions[0])
    const [End, setEnd] = useState(endOptions[0])
    let form = useFormContext()
    let paymentMonths = useFormContext().watch("payload.paymentMonths")
    const [payload , setPayload] =useState(paymentMonths)
    let session = form.watch("payload.session")
    const ProcessDateforEveryMonth =()=>{
        let payload = paymentMonths?.map((month:IpaymentMonths)=>{
            let monthNumber = moment.months().indexOf(month.month)
            let payload ={...month ,paymentDate:"",dueDate:""}
            if(month.isPayment){
                if(Start =="1st of the month"){
                    payload.paymentDate =moment(`1-${monthNumber+1}-${month.year}`,"D-M-YYYY").toISOString()}
                    else {
                        payload.paymentDate =moment(`10-${monthNumber+1}-${month.year}`,"D-M-YYYY").toISOString()
                    }
                    if(End =="last day of the month") {
                        payload.dueDate =moment(`1-${monthNumber+1}-${month.year}`,"D-M-YYYY").endOf('month').toISOString()
                    }
                    else {
                        payload.dueDate =moment(`10-${monthNumber!=11?monthNumber+2:1}-${monthNumber!=11?month.year:month.year+1}`,"D-M-YYYY").toISOString()
                    }
                }
            return payload
        })
        console.log(payload);
        
        setPayload(payload)
        if(!lod.isEqual (payload ,  paymentMonths)) {
            form.setValue("payload.paymentMonths",payload)
        }
    }
    
    useEffect(() => {
        ProcessDateforEveryMonth()
    }, [Start ,session ,End,lod.isEqual(paymentMonths,payload)])

  return (
    <div className="w-full flex gap-2 bg-[var(--box)] p-4">
<LabelWrapper
  className="w-1/2"
  labelClassName="text-sm font-semibold "
  label="Payment Date"
>
<CustomSelect_Reg data={startOptions} nosearch placeholder='Select payment date' state={Start} setState={setStart} />
  </LabelWrapper>
  <LabelWrapper
  className="w-1/2"
  labelClassName="text-sm font-semibold "
  label="Due Date"
>
<CustomSelect_Reg data={endOptions} nosearch placeholder='Select payment date' state={End} setState={setEnd} />
</LabelWrapper>
    </div>
  )
}



