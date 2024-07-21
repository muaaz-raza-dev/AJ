import { Input, Tooltip} from "antd"
import RegLabelWrapper from "../LabelWrapper.reg"
import { Controller, useFormContext } from "react-hook-form"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import { ArrowRight } from "lucide-react"
import {  useDebouncedCallback } from "use-debounce"
import useValidateGRno from "@/Hooks/Registeration/useValdiateGR"
import { FaBan } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import { FC } from "react"
const GRnoRegisterationFormField:FC<{edit?:boolean}> = ({edit}) => {
  const {control,getValues} = useFormContext()
  let {mutate,error:Error,isError,isSuccess,isLoading}=useValidateGRno(getValues("GR"))
  const debounced = useDebouncedCallback((value) => {mutate(value)},1500);
function GRSuffix(){

    if(isLoading) {
      return <RequestLoading size="20" stroke="2" dark/>
    }
    if(isError) {
    return <Tooltip title={Error.response.data.message}>
    <FaBan size={18}/>
    </Tooltip> }
  if(isSuccess) {
return  <Tooltip title={"GRNO is availble"}>
    <MdVerified color="green"  size={18} />
    </Tooltip>
    }
    
}

  return (
    <RegLabelWrapper className="w-[48%] relative" title="GR no">
    <Controller
  name="GRNO"
  rules={{required:"GRno is Required"}}
 control={control}
 disabled={edit}
  render={({ field ,fieldState:{error}}) => (<>
  <Input  {...field} type="number"  onChange={(e)=>{field.onChange(e);debounced(e.target.value)}} placeholder="189305" suffix={<GRSuffix/>} className="active:border-[var(--dark)]" />
  {
    isError&&
  <div className="absolute -bottom-12 w-full border border-[var(--primary)] rounded-md flex bg-[var(--bg)] shadow-lg p-2 px-4 gap-x-1 cursor-pointer">
  GRno. <b>{Error?.response.data?.payload?.GRNO}</b> <p>{Error?.response?.data?.payload?.FirstName}</p> already registered
  <ArrowRight size={16} className="self-end justify-self-end px-2"/>
  </div>
}
  {
    error && <p className="text-red-500 text-xs">{error.message}</p>
  }
  </>
  )}
/>
</RegLabelWrapper>
  )
}

export default GRnoRegisterationFormField
