import { Route, Routes } from "react-router-dom"
import Navigationbar from "./components/nav/navigationbar.set"
import UsersPage from "./components/Users/UsersPage.set"
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess"
import AccountsSectionForm from "./Pages/Account/AccountsSectionForm.set"
import ProfileSettingForm from "./Pages/Profile/ProfileSettingForm.set"
import AdvancedActionPage from "./Pages/AdvancedActions/AdvancedActionPage.set"
import NewAccountPageForm from "./Pages/New Account/NewAccountPageForm.acc.reg"

const SettingsFile = () => {
  return (
    <main className="flex flex-col gap-4">
        <Navigationbar/>
        <Routes>
            <Route index element={
           <RoleBasedAccess redirect="accounts" roleToGiveAccess={["user","admin"]}> 
              <ProfileSettingForm />
           </RoleBasedAccess> } />
            <Route path="/advanced-actions" element={
              <RoleBasedAccess redirect="accounts" roleToGiveAccess={"chief admin"}>
                  <AdvancedActionPage/>
              </RoleBasedAccess> } />
            <Route path="/accounts"  element={<AccountsSectionForm />} />
            <Route path="/users"  element={
              <RoleBasedAccess redirect="accounts" roleToGiveAccess={"chief admin"}>
              <UsersPage />
              </RoleBasedAccess>
              } />
              <Route path="/user/edit/:id"  element={
              <RoleBasedAccess redirect="accounts" roleToGiveAccess={"chief admin"}>
              <NewAccountPageForm edit={true} />
              </RoleBasedAccess>
              } />
              <Route path="/new-account"  element={
              <RoleBasedAccess redirect="accounts" roleToGiveAccess={"chief admin"}>
              <NewAccountPageForm/>
              </RoleBasedAccess>
              } />
        </Routes>
    </main>
  )
}

export default SettingsFile