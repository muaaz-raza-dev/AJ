import { Link } from "react-router-dom";
import useActiveRoute from "@/Hooks/Common/ActiveRoute";
import {  FaRegChartBar, FaSchool } from "react-icons/fa";
import { useAppSelector } from "@/app/ReduxHooks";
import SubSidebarLinks_Shrinked from "./SubSidebarLinks";
import { MdCurrencyExchange, MdOutlinePayments } from "react-icons/md";
import { FaCalendarMinus, FaUsersLine } from "react-icons/fa6";
import RoleBasedAccess from "../Middleware Hooks/RoleBasedAccess";

const SidebarLinks = () => {
  let { ValidateRoute } = useActiveRoute();
  let Expanded = useAppSelector((e) => e.global.Expand_Navbar);
  let ActiveClassName="!bg-[var(--light)] !text-[var(--dark)] !dark:text-light border-none rounded-md"
  return (
    <ul
      className={`flex w-full  items-center  h-full flex-col max-md:flex-row ${
        Expanded ? "gap-y-1" : "gap-y-4"
      } gap-x-2   max-md:justify-around  `}
    >
        <SubSidebarLinks_Shrinked label="Students">
        <Link
          to={"/students"}
          className={`md:w-full max-md:px-2 duration-50
             md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-2
            ${ValidateRoute({
            toCompare: "/students",
            index:true,
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4 max-md:flex-col gap-y-1 `}
        >
          <FaUsersLine  className="text-2xl max-md:3xl" />
          <p className="max-md:text-[0.8rem]  md:hidden leading-tight ">Students</p>
          {Expanded && <p className="max-md:hidden">Students</p>}
        </Link>
     </SubSidebarLinks_Shrinked>
     <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
      <SubSidebarLinks_Shrinked label="Transactions">
      <Link
          to={"/transactions"}
          className={`md:w-full max-md:px-2 duration-50 md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-2 ${ValidateRoute({
            toCompare: "/transactions",
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4 max-md:flex-col gap-y-1`}
        >
          <MdCurrencyExchange
           className="text-2xl max-md:3xl"
              
          />
          <p className="max-md:text-[0.8rem]  md:hidden leading-tight ">Transactions</p>
          {Expanded && <p className="max-md:hidden">Transactions</p>}
        </Link>
      </SubSidebarLinks_Shrinked> 
      </RoleBasedAccess>
     <SubSidebarLinks_Shrinked label="Classes & Teachers ">
        <Link
          to={"/dashboard"}
          className={`md:w-full max-md:px-2 duration-50 md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-2 ${ValidateRoute({
            toCompare: "/dashboard",
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4 max-md:flex-col gap-y-1`}
        >
          <FaSchool  className="text-2xl max-md:3xl"  stroke="2"  />
          <p className="max-md:text-[0.8rem]  md:hidden leading-tight ">Dashboard</p>
        {Expanded && <p className="max-md:hidden">Classes & Teachers</p>}
        </Link>
      </SubSidebarLinks_Shrinked>

      <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
      <SubSidebarLinks_Shrinked label="Payment Configurations ">
        <Link
          to={"/payment-settings"}
          className={`md:w-full max-md:px-2 duration-50 md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-2 ${ValidateRoute({
            toCompare: "/payment-settings",
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4 max-md:flex-col gap-y-1`}
        >
          <MdOutlinePayments  className="text-2xl max-md:3xl"  stroke="2"  />
          <p className="max-md:text-[0.8rem]  md:hidden leading-tight ">Configs</p>
          {Expanded && <p className="max-md:hidden">Payment Configuration</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
      </RoleBasedAccess>
     
      <SubSidebarLinks_Shrinked label="Yearly Sessions and Year cycles">
        <Link
          to={"/sessions"}
          className={`md:w-full max-md:px-2 duration-50 md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-2 ${ValidateRoute({
            toCompare: "/sessions",
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4 max-md:flex-col gap-y-1`}
        >
          <FaCalendarMinus   className="text-2xl max-md:3xl"  />
          <p className="max-md:text-[0.8rem]  md:hidden leading-tight ">Sessions</p>
          {Expanded && <p className="max-md:hidden">Yearly Sessions</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
    

    

 

 

      <RoleBasedAccess roleToGiveAccess={["chief admin"]}>
      <SubSidebarLinks_Shrinked label="Academic Stats">
        <Link
          to={"/stats"}
          className={`md:w-full max-md:px-2 duration-50 md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-2 ${ValidateRoute({
            toCompare: "/stats",
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4 max-md:flex-col gap-y-1`}
        >
          <FaRegChartBar  className="text-2xl max-md:3xl" />
          <p className="max-md:text-[0.8rem]  md:hidden leading-tight ">Stats</p>
          {Expanded && <p className="max-md:hidden">Home</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
      </RoleBasedAccess >

    </ul>
  );
};

export default SidebarLinks;
