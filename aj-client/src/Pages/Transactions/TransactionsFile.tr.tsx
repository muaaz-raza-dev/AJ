import { Route, Routes } from "react-router-dom"
import TransactionPage from "./Sub pages/Transactions/TransactionPage.tr"
import TransactionComposePage from "./Sub pages/Transaction composer/components/TransactionComposePage.tr"

const TransactionsFile = () => {
  return (
    <Routes>
      <Route element={<TransactionPage/>} path="/"/> 
      <Route element={<TransactionComposePage/>} path="/create"/> 
    </Routes>
  )
}

export default TransactionsFile
