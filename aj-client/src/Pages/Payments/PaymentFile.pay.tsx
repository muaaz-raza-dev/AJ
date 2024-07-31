import { Route, Routes } from "react-router-dom"
import PaymentConfigPage from "./Config/PaymentConfigPage.pay"
import Landing_Payment_SettingsPage from "./Landing Page/Landing_Payment_SettingsPage.pay"
import PaymentDetailedPage from "./Preview Page/PaymentDetailedPage.pay.d"

const PaymentFile = () => {
  return (
    <Routes>
        <Route index element={ <Landing_Payment_SettingsPage/>}/>
        <Route path="/:id" element={ <PaymentDetailedPage/>}/>
        <Route path="/setup" element={ <PaymentConfigPage/>}/>
        <Route path="/edit/:id" element={ <PaymentConfigPage edit={true}/>}/>
    </Routes>
  )
}

export default PaymentFile