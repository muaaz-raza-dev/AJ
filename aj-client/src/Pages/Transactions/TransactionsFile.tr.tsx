import { Route, Routes } from "react-router-dom"
import TransactionPage from "./Sub pages/Transactions/TransactionPage.tr"
import TransactionComposePage from "./Sub pages/Transaction composer/components/TransactionComposePage.tr"
import TransactionDetailsPage from "./Sub pages/Detail Page/TransactionDetailsPage.tr.d"

const TransactionsFile = () => {
  return (
    <>
    <Routes>
      <Route index element={<TransactionPage/>}  /> 
      <Route element={<TransactionComposePage/>} path="/create"/> 
      <Route element={<TransactionDetailsPage/>} path="/transaction/:id"/> 
    </Routes>
    </>
  )
}

export default TransactionsFile
