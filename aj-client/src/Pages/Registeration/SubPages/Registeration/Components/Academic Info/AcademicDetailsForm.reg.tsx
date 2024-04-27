import { AutoComplete, Input, Radio} from "antd"
import RegLabelWrapper from "../LabelWrapper.reg"
import { Controller, useFormContext } from "react-hook-form"
import PolioandVaccineConfirmationField from "./PolioandVaccineConfirmationField.reg"
import DateOfAdmissionField from "./DateOfAdmissionField.reg"
import GRnoRegisterationFormField from "./GRnoField.reg"
import { useAppSelector } from "@/app/ReduxHooks"
import { FC } from "react"


const RegAcademicDetailsForm:FC<{edit?:boolean}> = ({edit}) => {
  const {control} = useFormContext()
  let {classes} = useAppSelector(state=>state.global)

  return (
    <div className="flex w-full flex-wrap gap-x-4 gap-y-6">
       <GRnoRegisterationFormField edit={edit}/>
    <RegLabelWrapper className="w-[48%]" title="Roll no">
      <Controller rules={{required:"Roll no is required"}} name="RollNo" control={control} render={({field,fieldState:{error}})=>
       ( 
       <>
       <Input {...field}  placeholder="003923" className="active:border-[var(--dark)]"/>
       {
            error && <p className="text-red-500 text-xs">{error.message}</p>
          }
       </>
  )}/>
    </RegLabelWrapper>

    {!edit 
    &&
    <RegLabelWrapper className="w-[48%]" title="Class">
      <Controller rules={{required:"Class is Required"}} name="Class" control={control} render={({field,fieldState:{error}})=>(
        <>
        <AutoComplete {...field} placeholder="7th" options={classes.map(elm=>{return{value:elm}})}/>
        {
          error && <p className="text-red-500 text-xs">{error.message}</p>
        }
        </>
        )
      }/>
    </RegLabelWrapper>}
    <RegLabelWrapper className="w-[48%]" title="Section">
      <Controller name="Section" control={control} render={({field})=>(
       <Input {...field}  placeholder="A"  className="active:border-[var(--dark)]"/>
  )}/>
    </RegLabelWrapper>
      <RegLabelWrapper className="w-[48%]" title="Admission">
      <Controller
          name="NewAdmission"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field} defaultValue={false}>
              <Radio value={true}>New Admission</Radio>
              <Radio value={false}>Past Admission</Radio>
            </Radio.Group>
          )}
        />
    </RegLabelWrapper>
 <DateOfAdmissionField edit={edit}/>
<PolioandVaccineConfirmationField/>
   
   
 
  </div>
  )
}

export default RegAcademicDetailsForm