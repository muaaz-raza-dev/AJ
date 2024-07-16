import { CalendarMinus2, User2Icon } from "lucide-react";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import useActiveRoute from "@/Hooks/Common/ActiveRoute";
import {  FaRegChartBar } from "react-icons/fa";
import { useAppSelector } from "@/app/ReduxHooks";
import SubSidebarLinks_Shrinked from "./SubSidebarLinks";
import { MdCurrencyExchange, MdOutlinePayments } from "react-icons/md";

const SidebarLinks = () => {
  let { ValidateRoute } = useActiveRoute();
  let Expanded = useAppSelector((e) => e.global.Expand_Navbar);
  
  return (
    <ul
      className={`flex w-full  items-center h-full flex-col max-md:flex-row ${
        Expanded ? "gap-y-1" : "gap-y-4"
      } gap-x-8 max-md:justify-around  `}
    >
      <SubSidebarLinks_Shrinked label="Academic Stats">
        <Link
          to={"/"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/",
            classesToApply:
              "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <FaRegChartBar size={24}/>

          {Expanded && <p className="max-md:hidden">Home</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
      <SubSidebarLinks_Shrinked label="Yearly Sessions and Year cycles">
        <Link
          to={"/sessions"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/sessions",
            exact: false,
            classesToApply:
              "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <CalendarMinus2 size={24} />
          {Expanded && <p className="max-md:hidden">Yearly Sessions</p>}
        </Link>
      </SubSidebarLinks_Shrinked>

      <SubSidebarLinks_Shrinked label="Classes & Teachers ">
        <Link
          to={"/dashboard"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/dashboard",
            exact: false,
            classesToApply:
              "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <SiGoogleclassroom size={24} stroke="2" />
          {Expanded && <p className="max-md:hidden">Classes & Teachers</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
   
      <SubSidebarLinks_Shrinked label="Students">
        <Link
          to={"/students"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded    items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/students",
            exact: false,
            classesToApply:
              "!bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <User2Icon />
          {Expanded && <p className="max-md:hidden">Students</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
      <SubSidebarLinks_Shrinked label="Transactions">
      <Link
          to={"/transactions"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/transactions",
            exact: false,
            classesToApply:
              "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <MdCurrencyExchange
          size={24}
              stroke="2" className=""
          />
          {Expanded && <p className="max-md:hidden">Transactions</p>}
        </Link>
      </SubSidebarLinks_Shrinked> 
      <SubSidebarLinks_Shrinked label="Payment Configurations ">
        <Link
          to={"/payment-settings"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/payment-settings",
            exact: false,
            classesToApply:
              "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <MdOutlinePayments size={24} stroke="2"  />
          {Expanded && <p className="max-md:hidden">Classes & Teachers</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
    </ul>
  );
};

export default SidebarLinks;
