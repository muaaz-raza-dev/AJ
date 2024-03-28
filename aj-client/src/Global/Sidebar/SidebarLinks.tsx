import {  User2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import useActiveRoute  from "@/Hooks/Common/ActiveRoute"
import {  IoHome } from "react-icons/io5";
import { FaMoneyCheckAlt, FaUsersCog } from "react-icons/fa";
import { Badge } from "antd";

const SidebarLinks = () => {
    let {ValidateRoute} = useActiveRoute()
  return (
    <ul className="flex w-full  items-center h-full flex-col max-md:flex-row gap-y-1 gap-x-8 max-md:justify-around  ">
        <Link to={"/"} className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  px-4  border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({toCompare:"/",classesToApply:"bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md"})}  flex gap-x-4`}>
            <IoHome  size={24}/>
            <p className="max-md:hidden">
             Home
            </p>
        </Link>
        <Link to={"/registeration"} className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  px-4  border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({toCompare:"/registeration", exact:false,classesToApply:"!bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md"})}  flex gap-x-4`}>
        <FaUsersCog size={24}/>
        <p className="max-md:hidden">
         Registeration
        </p>
        </Link>
        <Link to={"/students"} className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center px-4   border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({toCompare:"/students",classesToApply:"!bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md"})}  flex gap-x-4`}>
            <User2Icon/>
            <p className="max-md:hidden">
             Students
            </p>
        </Link>
        <Link to={"/transactions"} className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center px-4  border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({toCompare:"/transactions",exact:false,classesToApply:"bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md"})}  flex gap-x-4 items-center`}>
            <FaMoneyCheckAlt size={24} stroke="2"/> 
            <p className="max-md:hidden">
            Transactions
            </p>
            <Badge  dot></Badge>
        </Link>
    </ul>
  )
}

export default SidebarLinks
