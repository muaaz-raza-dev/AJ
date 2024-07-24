import { Route, Routes } from "react-router-dom"
import Navigationbar from "./components/nav/navigationbar.set"
import AccountsSectionForm from "./components/Account/AccountsSectionForm.set"
import ProfileSettingForm from "./components/Profile/ProfileSettingForm.set"
import UsersPage from "./components/Users/UsersPage.set"
import RoleBasedAccess from "@/Global/Middleware/RoleBasedAccess"

const SettingsFile = () => {
  return (
    <main className="flex flex-col gap-4">
        <Navigationbar/>
        <Routes>
            <Route index element={<RoleBasedAccess redirect="accounts" roleToGiveAccess={["user","admin"]}> <ProfileSettingForm /> </RoleBasedAccess> } />
            <Route path="/accounts"  element={<AccountsSectionForm />} />
            <Route path="/users"  element={<UsersPage />} />
        </Routes>
    </main>
  )
}

export default SettingsFile