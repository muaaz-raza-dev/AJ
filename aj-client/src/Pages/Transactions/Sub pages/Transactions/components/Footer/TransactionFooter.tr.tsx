import TransactionPagination from "./TransactionPagination.tr"

const TransactionFooter = () => {
  return (
    <div className="flex items-center justify-between gap-x-2 ">
      <p className="gap-x-1 flex">
        Showing 
        <b className="text-[var(--dark)]">
        1-10
        </b>
         out of 
         <b className="text-[var(--dark)]">
         60 
         </b>
         transactions
      </p>

      <TransactionPagination/>

    </div>
  )
}

export default TransactionFooter
