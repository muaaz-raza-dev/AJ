import { FC } from 'react'
import TransactionComposerFooter from './TransactionComposerFooter.tr'
import TransactionPurposeSection from './TransactionPurposeSection.tr'
import TransactionsBasicDetailsSection from './TransactionsBasicDetailsSection.tr'
const TransactionFeeDetailsForm:FC<{isLoading:boolean,PrintFn:()=>void}> = ({isLoading,PrintFn}) => {
  return (
<div className="flex flex-col gap-y-3 w-full">
  <TransactionsBasicDetailsSection/>
  <TransactionPurposeSection/>
  <TransactionComposerFooter isLoading={isLoading} PrintFn={PrintFn} />
</div>
  )
}

export default TransactionFeeDetailsForm
