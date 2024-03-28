import TransactionDateSelection from "./TransactionDateSelection.tr"
import TransactionFilterSearch from "./TransactionFilterSearch.tr"
import TransactionSelectType from "./TransactionSelectType.tr"

const TransactionFilterBar = () => {
  return (
    <div className="w-full flex gap-x-4">
      <TransactionFilterSearch/>
      <div className="w-full flex gap-x-4 justify-end">
      <TransactionSelectType/>
      <TransactionDateSelection/>
      </div>
    </div>
  )
}

export default TransactionFilterBar
