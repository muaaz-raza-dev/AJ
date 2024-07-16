import { useAppSelector } from '@/app/ReduxHooks'
import { Switch } from 'antd'
import  { FC } from 'react'
import { useFormContext } from 'react-hook-form'

const CustomSwitch:FC<{fieldName:string}> = ({fieldName}) => {
    let form =useFormContext()
    let isCustom = form.watch(`${fieldName}.paymentType`)=="Custom"
    let paymentConfigId = form.watch(`${fieldName}.paymentConfigId`)
    let {Amounts} =useAppSelector(s=>s.trComposeFilters.FeeInfo)
    const onChange = (val:boolean)=>{
        form.setValue(`${fieldName}.paymentType`,val?"Custom":"Registered")
        if(!val) form.setValue(`${fieldName}.amount.realAmount`,Amounts[paymentConfigId])
    }
  return (
    <Switch defaultChecked checked={isCustom} className='bg-gray-600' onChange={onChange} />
  )
}

export default CustomSwitch