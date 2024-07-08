import { CalendarMinus2, User2Icon } from "lucide-react";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";
import useActiveRoute from "@/Hooks/Common/ActiveRoute";
import { FaMoneyCheckAlt, FaRegChartBar, FaUsersCog } from "react-icons/fa";
import { Badge } from "antd";
import { useAppSelector } from "@/app/ReduxHooks";
import SubSidebarLinks_Shrinked from "./SubSidebarLinks";

const SidebarLinks = () => {
  let { ValidateRoute } = useActiveRoute();
  let Expanded = useAppSelector((e) => e.global.Expand_Navbar);
  let { Transaction_Config_update: TransactionUpdate } = useAppSelector(
    (s) => s.global
  );
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
      <SubSidebarLinks_Shrinked label="Student's Registeration">
        <Link
          to={"/registeration"}
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center  ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/registeration",
            exact: false,
            classesToApply:
              "!bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })}  flex gap-x-4`}
        >
          <FaUsersCog size={24} />
          {Expanded && <p className="max-md:hidden">Registeration</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
      <SubSidebarLinks_Shrinked label="Student's Details">
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
          className={`md:w-full transition-colors hover:bg-[var(--primary)] hover:border-transparent hover:text-[var(--dark)] text-[var(--primary)] hover:rounded   items-center ${
            Expanded ? "px-4" : "justify-center"
          } border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/transactions",
            exact: false,
            classesToApply:
              "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
          })} group  flex gap-x-4 items-center`}
        >
          <Badge dot={TransactionUpdate}>
            <FaMoneyCheckAlt
              size={24}
              stroke="2"
              className={`group-hover:border-transparent group-hover:text-[var(--dark)] text-[var(--primary)] group-hover:rounded ${ValidateRoute(
                {
                  toCompare: "/transactions",
                  exact: false,
                  classesToApply:
                    "bg-[var(--primary)] !text-[var(--dark)] border-none rounded-md",
                }
              )}`}
            />
          </Badge>
          {Expanded && <p className="max-md:hidden">Transactions</p>}
        </Link>
      </SubSidebarLinks_Shrinked>
    </ul>
  );
};

export default SidebarLinks;
