import TransactionCreateHeader from "../../TransactionCreateHeader.tr"
import TransactionComposeForm from "./TransactionComposeForm.tr"

const TransactionDetailSection = () => {
  return (
    <div className="bg-[var(--box)] dark:bg-darker dark:text-white rounded w-full p-2 max-sm:p-0 gap-y-3 flex flex-col">
      <TransactionCreateHeader/>
      <TransactionComposeForm/>
    </div>
  )
}

export default TransactionDetailSection
