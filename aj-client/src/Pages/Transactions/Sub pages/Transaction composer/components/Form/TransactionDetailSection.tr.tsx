import TransactionCreateHeader from "../../TransactionCreateHeader.tr"
import TransactionComposeForm from "./TransactionComposeForm.tr"

const TransactionDetailSection = () => {
  return (
    <div className="bg-[var(--box)] rounded w-full p-2 gap-y-3 flex flex-col">
      <TransactionCreateHeader/>
      <TransactionComposeForm/>
    </div>
  )
}

export default TransactionDetailSection
