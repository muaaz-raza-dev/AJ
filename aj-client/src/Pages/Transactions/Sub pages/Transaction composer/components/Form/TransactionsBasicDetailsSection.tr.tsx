import RegLabelWrapper from '@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg'
import TransactionSearchStudentsField from './TransactionSearchStudentsField.tr'
import {  Input } from 'antd'

import TransactionStudentDisplay from '../TransactionStudentDisplay.tr'
import { Controller, useFormContext } from 'react-hook-form'
import TransactionDuesDetailsSection from './TransactionDuesDetailsSection.tr'

const TransactionsBasicDetailsSection = () => {
 let {control} = useFormContext()
  return (
    <div className="flex flex-wrap gap-4">
<TransactionSearchStudentsField />
<TransactionStudentDisplay/>
<TransactionDuesDetailsSection/>
<RegLabelWrapper title='Payor Name' className='w-[100%]'>
<Controller control={control} rules={{required:"Payors Name is required"}} name='PayorsName' render={({field,fieldState:{error}})=>
{return(<><Input {...field}   placeholder="John Bidden" />
 {error && <p className="text-red-500 text-xs">{error.message}</p>}
  </>
) }}/>


</RegLabelWrapper>




</div>
  )
}

export default TransactionsBasicDetailsSection

