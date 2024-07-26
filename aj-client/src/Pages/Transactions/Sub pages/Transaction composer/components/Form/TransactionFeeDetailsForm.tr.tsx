import { FC } from 'react'
import TransactionComposerFooter from './TransactionComposerFooter.tr'
import TransactionPurposeSection from './TransactionPurposeSection.tr'
import TransactionsBasicDetailsSection from './TransactionsBasicDetailsSection.tr'
const TransactionFeeDetailsForm:FC<{isLoading:boolean,}> = ({isLoading}) => {
  return (
<div className="flex flex-col gap-y-3 w-full">
  <TransactionsBasicDetailsSection/>
  <TransactionPurposeSection/>
  <TransactionComposerFooter isLoading={isLoading} />
</div>
  )
}

export default TransactionFeeDetailsForm
