import { Controller, useFormContext } from "react-hook-form"
import RegLabelWrapper from "../LabelWrapper.reg"
import { Radio } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"


const PolioandVaccineConfirmationField = () => {
    const [FieldState, setFieldState] = useState<{title:string,name:string}>({title:"Polio Permission",name:"PolioPermission"});
    let {control,watch} =useFormContext()
    let DOB=watch("DOB")
    useEffect(() => {
        if(moment().diff(DOB, 'years')>5)setFieldState({title:"Covid-19 Vaccination",name:"CovidVaccine"})
    }, [DOB]);
    if (DOB) {
        
        return (
            <RegLabelWrapper className="w-[48%]" title={FieldState.title}>
    <Controller
          name={FieldState.name}
          control={control}
          render={({ field }) => (
              <Radio.Group {...field}  defaultValue={true}>
      <Radio value={true}>Yes</Radio>
      <Radio value={false}>No</Radio>
    </Radio.Group>
          )}
          />
    </RegLabelWrapper>
  )
}
}

export default PolioandVaccineConfirmationField
