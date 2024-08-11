import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess"
import useActiveRoute from "@/Hooks/Common/ActiveRoute"
import { Link } from "react-router-dom"

const Navigationbar = () => {
    let {ValidateRoute}  =useActiveRoute()
    let ActiveStyle = "dark:bg-dark !bg-darker text-white"
  return (
    <section className="flex gap-4 overflow-auto pb-4">
      <RoleBasedAccess roleToGiveAccess={["admin","user"]}>
            <Link to={"/settings"} className={`${ValidateRoute({toCompare:"/settings",classesToApply:ActiveStyle})} px-4 bg-gray-200 text-nowrap whitespace-nowrap text-sm  hFont font-medium text-gray-700 dark:text-white rounded-md py-1 `}>Personal Information</Link>
      </RoleBasedAccess>
            <Link to={"accounts"} className={`${ValidateRoute({toCompare:"/settings/accounts",classesToApply:ActiveStyle})} px-4 bg-gray-200 text-nowrap whitespace-nowrap text-sm  hFont font-medium text-gray-700 dark:text-white rounded-md py-1 `}>Account Settings</Link>
      <RoleBasedAccess roleToGiveAccess={"chief admin"}>
            

            <Link to={"users"} className={`${ValidateRoute({toCompare:"/settings/users",classesToApply:ActiveStyle})} px-4 bg-gray-200 text-nowrap whitespace-nowrap text-sm  hFont font-medium text-gray-700 dark:text-white rounded-md py-1 `}>Users Control</Link>
            </RoleBasedAccess>
            <RoleBasedAccess roleToGiveAccess={"chief admin"}>
            <Link to={"new-account"} className={`${ValidateRoute({toCompare:"/settings/new-account",classesToApply:ActiveStyle})} px-4 bg-gray-200 text-nowrap whitespace-nowrap text-sm  hFont font-medium text-gray-700 dark:text-white rounded-md py-1 `}>New Users</Link>
            </RoleBasedAccess>
            <RoleBasedAccess roleToGiveAccess={"chief admin"}>

            <Link to={"advanced-actions"}
             className={`${ValidateRoute({toCompare:"/settings/advanced-actions",classesToApply:ActiveStyle})} px-4 bg-gray-200 text-nowrap whitespace-nowrap text-sm  hFont font-medium text-gray-700 dark:text-white rounded-md py-1 `}>
            Advanced Actions</Link>
            </RoleBasedAccess>
        </section>
  )
}

export default Navigationbar