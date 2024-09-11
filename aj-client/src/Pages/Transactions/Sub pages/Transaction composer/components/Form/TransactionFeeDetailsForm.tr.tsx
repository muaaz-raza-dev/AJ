import { FC } from 'react'
import TransactionComposerFooter from './TransactionComposerFooter.tr'
import TransactionPurposeSection from './TransactionPurposeSection.tr'
import TransactionsBasicDetailsSection from './TransactionsBasicDetailsSection.tr'
const TransactionFeeDetailsForm:FC<{isLoading:boolean,edit?:boolean}> = ({isLoading,edit=true}) => {
  return (
<div className="flex flex-col gap-y-3 w-full">
  <TransactionsBasicDetailsSection edit={edit}/>
  <TransactionPurposeSection/>
  <TransactionComposerFooter edit={edit} isLoading={isLoading} />
</div>
  )
}

export default TransactionFeeDetailsForm
