import RegLabelWrapper from '@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg'
import TransactionSearchStudentsField from './TransactionSearchStudentsField.tr'
import {  Input } from 'antd'

import TransactionStudentDisplay from '../TransactionStudentDisplay.tr'
import { Controller, useFormContext } from 'react-hook-form'
import { useAppSelector } from '@/app/ReduxHooks'

const TransactionsBasicDetailsSection = () => {
 let {control} = useFormContext()
 let {PayorsName} = useAppSelector(state=>state.trCompose)
  return (
    <div className="flex flex-wrap gap-4">
<TransactionSearchStudentsField />
<TransactionStudentDisplay/>
<RegLabelWrapper title='Payor Name' className='w-[100%]'>
<Controller control={control} rules={{required:"Payors Name is required"}} name='PayorsName' render={({field,fieldState:{error}})=>
{return(<><Input {...field} defaultValue={PayorsName}  placeholder="John Bidden" />
 {error && <p className="text-red-500 text-xs">{error.message}</p>}
  </>
) }}/>


</RegLabelWrapper>




</div>
  )
}

export default TransactionsBasicDetailsSection

