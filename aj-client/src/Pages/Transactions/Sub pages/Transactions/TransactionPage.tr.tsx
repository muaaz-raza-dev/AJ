import TransactionFilterBar from "./components/FilterBar/TransactionFilterBar.tr"
import TransactionFooter from "./components/Footer/TransactionFooter.tr"
import TransactionHeader from "./components/Header/TransactionHeader.tr"
import TransactionTable from "./components/Table/TransactionTable.tr"

const TransactionPage = () => {
  
  return (
    <main className="flex-col flex gap-y-4 py-3">
      <TransactionHeader/>
      <TransactionFilterBar/>
      <TransactionTable/>
      <TransactionFooter/>

    </main>
  )
}

export default TransactionPage
