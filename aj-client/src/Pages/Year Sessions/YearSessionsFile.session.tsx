import { Route, Routes } from "react-router-dom"
import SessionsLandingPage from "./Pages/Landing/Sections/SessionsLandingPage.session"
import SessionRegisterations from "./Pages/Registeration/form/SessionRegisterationsForm.session"

const YearSessionsFile = () => {
  return (
    <Routes>
        <Route index element={<SessionsLandingPage/>}/>
        <Route path="/registeration" element={<SessionRegisterations/>}/>
        <Route path="/edit/:id" element={<SessionRegisterations edit={true}/>}/>
    </Routes>
  )
}

export default YearSessionsFile