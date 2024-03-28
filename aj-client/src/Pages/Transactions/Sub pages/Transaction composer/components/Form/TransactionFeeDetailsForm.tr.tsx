import TransactionComposerFooter from './TransactionComposerFooter.tr'
import TransactionPurposeSection from './TransactionPurposeSection.tr'
import TransactionsBasicDetailsSection from './TransactionsBasicDetailsSection.tr'
const TransactionFeeDetailsForm = () => {

  return (
<div className="flex flex-col gap-y-3 w-full">
  <TransactionsBasicDetailsSection/>
  <TransactionPurposeSection/>
  <TransactionComposerFooter/>
</div>
  )
}

export default TransactionFeeDetailsForm
