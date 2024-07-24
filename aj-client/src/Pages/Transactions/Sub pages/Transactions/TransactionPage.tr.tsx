import { useReadTransactionsMeta } from "@/Hooks/Transactions/useReadTransactionsMeta"
import TransactionFilterBar from "./components/FilterBar/TransactionFilterBar.tr"
import TransactionFooter from "./components/Footer/TransactionFooter.tr"
import TransactionTable from "./components/Table/TransactionTable.tr"

const TransactionPage = () => {
  useReadTransactionsMeta()
  return (
    <main className="flex-col flex gap-y-4 py-3">
      <TransactionFilterBar/>
      <TransactionTable/>
      <TransactionFooter/>
    </main>
  )
}

export default TransactionPage
