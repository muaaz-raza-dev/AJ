import RegLabelWrapper from '@/Pages/Registeration/SubPages/Registeration/Components/LabelWrapper.reg'
import TransactionSearchStudentsField from './TransactionSearchStudentsField.tr'
import {  Input } from 'antd'

import TransactionStudentDisplay from '../TransactionStudentDisplay.tr'
import { Controller, useFormContext } from 'react-hook-form'
import TransactionDuesDetailsSection from './TransactionDuesDetailsSection.tr'
import { FC } from 'react'

const TransactionsBasicDetailsSection:FC<{edit?:boolean}> = ({edit=false}) => {
 const {control} = useFormContext()
  return (
<div className="flex flex-wrap gap-4">
<TransactionSearchStudentsField edit={edit} />
<TransactionStudentDisplay/>
<TransactionDuesDetailsSection/>
<RegLabelWrapper required title='Payor Name' className='w-[100%]'>
<Controller control={control} name='PayorsName' render={({field,fieldState:{error}})=>
{return(<><Input {...field} className='dark:bg-darker dark:text-white dark:border-dark dark:placeholder:text-gray-500'   placeholder="John Bidden" />
 {error && <p className="text-red-500 text-xs">{error.message}</p>}
  </>
) }}/>


</RegLabelWrapper>




</div>
  )
}

export default TransactionsBasicDetailsSection

