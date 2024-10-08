import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks"
import { RedHisFilters } from "@/app/Slices/StudentHistorySlice"
import useGetStdFeeHistory, { useGetStdDueHistory } from "@/Hooks/Student History/useGetStdFeeHistory"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
import { FC, useEffect } from "react"
const FilterBar = () => {
  let  {Sessions,PaymentConfigs,feeTypes,DataTypes} =useAppSelector(s=>s.studentHistory.filters)
  let dispatch = useAppDispatch()
  let {mutate} =useGetStdFeeHistory()
  let {mutate:getDues} = useGetStdDueHistory()
  useEffect(() => {
  if(DataTypes.selected == "Dues") getDues()
  }, [DataTypes.selected])
  useEffect(() => {
  if(PaymentConfigs.selected) {mutate()}
  }, [PaymentConfigs.selected])
  useEffect(() => {
    if(feeTypes.selected == "One Time" || feeTypes.selected=="Yearly") mutate()
    }, [feeTypes.selected])
  let handleSessionSelection       =  (val:string) =>{dispatch(RedHisFilters({type:"selected","Sessions":val,"PaymentConfigs":PaymentConfigs.available[val][feeTypes.selected][0].value}))}
  let handleFeeTypeSelection       =  (val:string) =>{
    if(val != "One Time") {
      dispatch(RedHisFilters({type:"selected","feeTypes":val,"PaymentConfigs":PaymentConfigs.available[Sessions.selected][val][0].value}))
    }
    else {
      dispatch(RedHisFilters({type:"selected",feeTypes:val}))
    }
    }
  let handlePaymentConfigSelection =  (val:string) =>{dispatch(RedHisFilters({type:"selected","PaymentConfigs":val}))}
  let handleDataTypesSelection     =  (val:string) =>{dispatch(RedHisFilters({type:"selected","DataTypes":val}))}
  return (
    <div className="filterbar items-center flex justify-between max-lg:flex-col max-lg:items-start gap-2  w-full">
        <div className="flex gap-2 flex-wrap w-full">
    <CustomSelectComponent disabled={DataTypes.selected=="Dues" || feeTypes.selected=="One Time"} label="Session" state={Sessions.selected} data={Sessions.available} setState={handleSessionSelection} />
    <CustomSelectComponent disabled={DataTypes.selected=="Dues"} label="Fee Type" state={feeTypes.selected} rawData={feeTypes.available} setState={handleFeeTypeSelection} />            
    <CustomSelectComponent disabled={DataTypes.selected=="Dues" || feeTypes.selected=="One Time"} label="Payment Config" state={PaymentConfigs.selected} 
    data={PaymentConfigs?.available?.[Sessions.selected]?.[feeTypes.selected]||[]} setState={handlePaymentConfigSelection} /> 
    <CustomSelectComponent label="Data Type" state={DataTypes.selected} rawData={DataTypes.available} setState={handleDataTypesSelection} />
        </div>
    <div className="flex gap-2 max-md:w-full max-md:hidden">
    <CustomSelectComponent label="Data Type" state={DataTypes.selected} rawData={DataTypes.available} setState={handleDataTypesSelection} />
          {/* <Button className="rounded-lg max-md:hidden bg-dark  px-8  text-white hover:bg-dark  ">Export</Button> */}
      </div>
    </div>
  )
}


const CustomSelectComponent:FC<{state:string,label:string,disabled?:boolean,setState:(val:string)=>void,rawData?:string[],data?:{value:string,label:string}[]}> 
 = ({state,setState,data,rawData,label,disabled})=>{
    return  (<>
    <Select value={state} onValueChange={setState} disabled={disabled}>
    <SelectTrigger className=" h-12 md:min-w-[120px] md:max-w-max max-md:w-[48%]    rounded-lg text-dark   border-dark dark:text-white border-2 bg-transparent 
    font-bold  relative  focus:ring-0" >
  <p className="absolute -top-0.5 text-[0.67rem] text-gray-400   font-bold ">{label}</p>
      <SelectValue   />
    </SelectTrigger>
    <SelectContent>
      {
        data && data.map(e=> <SelectItem value={e.value}>{e.label}</SelectItem>)
      }
      {
        rawData && rawData.map(e=> <SelectItem value={e}>{e}</SelectItem>)
      }
    </SelectContent>
  </Select>
    </>)
}
export default FilterBar