import { Link } from "react-router-dom";
import useActiveRoute from "@/Hooks/Common/ActiveRoute";
import { FaRegChartBar, FaSchool } from "react-icons/fa";
import { useAppSelector } from "@/app/ReduxHooks";
import SubSidebarLinks_Shrinked from "./SubSidebarLinks";
import { MdCurrencyExchange, MdOutlinePayments } from "react-icons/md";
import { FaCalendarMinus, FaUsersLine } from "react-icons/fa6";
import RoleBasedAccess from "../Middleware Hooks/RoleBasedAccess";
import NestedNavigationWrapper from "./Components/NestedNavigationWrapper";

const SidebarLinks = () => {
  let { ValidateRoute } = useActiveRoute();
  let Expanded = useAppSelector((e) => e.global.Expand_Navbar);
  let ActiveClassName =
    "!bg-[var(--light)] !text-[var(--dark)] !dark:text-light border-none rounded-md";
  const EachLinkClass = `md:w-full max-md:px-2 duration-50
             md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center border-[var(--primary)] md:py-3 max-md:py-2 
            flex gap-x-4 max-md:flex-col gap-y-1`;
  return (
    <ul
      className={`flex w-full  items-center  h-full flex-col max-md:flex-row ${
        Expanded ? "gap-y-1" : "gap-y-4"
      } gap-x-2   max-md:justify-around  `}
    >
      <NestedNavigationWrapper
        labels={[
          { label: "Register Student", url: "/students/registeration" },
          { label: "Students", url: "/students" },
        ]}
      >
        <SubSidebarLinks_Shrinked label="Students">
          <div
            className={` ${EachLinkClass}  ${
              Expanded ? "px-4" : "justify-center"
            } 
            ${ValidateRoute({
              toCompare: "/students",
              index: true,
              exact: false,
              classesToApply: ActiveClassName,
            })}   `}
          >
            <FaUsersLine className="text-2xl max-md:3xl" />
            <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]   md:hidden leading-relaxed ">
              Students
            </p>
            {Expanded && <p className="max-md:hidden">Students</p>}
          </div>
        </SubSidebarLinks_Shrinked>
      </NestedNavigationWrapper>

      <NestedNavigationWrapper
        labels={[
          { label: "Transactions", url: "/transactions" },
          { label: "Create Transaction", url: "/transactions/create" },
        ]}
      >
        <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
          <SubSidebarLinks_Shrinked label="Transactions">
            <div
              className={`${EachLinkClass} ${
                Expanded ? "px-4" : "justify-center"
              }  ${ValidateRoute({
                toCompare: "/transactions",
                exact: false,
                classesToApply: ActiveClassName,
              })}  `}
            >
              <MdCurrencyExchange className="text-2xl max-md:3xl" />
              <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]  md:hidden leading-relaxed ">
                Transactions
              </p>
              {Expanded && <p className="max-md:hidden">Transactions</p>}
            </div>
          </SubSidebarLinks_Shrinked>
        </RoleBasedAccess>
      </NestedNavigationWrapper>

      <NestedNavigationWrapper
        labels={[
          { label: "Classes", url: "/dashboard/classes" },
          { label: "Teacher & Staffs ", url: "/dashboard/staffs" },
          { label: "Register Class", url: "dashboard/classes" },
          { label: "Register Staff", url: "dashboard/classes" },
        ]}
      >
        <SubSidebarLinks_Shrinked label="Classes & Teachers ">
          <div
            className={`${EachLinkClass} ${
              Expanded ? "px-4" : "justify-center"
            }  ${ValidateRoute({
              toCompare: "/dashboard",
              exact: false,
              classesToApply: ActiveClassName,
            })}  `}
          >
            <FaSchool className="text-2xl max-md:3xl" stroke="2" />
            <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]  md:hidden leading-relaxed ">
              Dashboard
            </p>
            {Expanded && <p className="max-md:hidden">Classes & Teachers</p>}
          </div>
        </SubSidebarLinks_Shrinked>
      </NestedNavigationWrapper>

      <NestedNavigationWrapper
        labels={[
          { label: "Payment Configurations", url: "/payment-settings" },
          { label: "Register Payment Config", url: "/payment-settings/setup" },
        ]}
      >
        <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
          <SubSidebarLinks_Shrinked label="Payment Configurations ">
            <Link
              to={"/payment-settings"}
              className={`${EachLinkClass} ${
                Expanded ? "px-4" : "justify-center"
              }  ${ValidateRoute({
                toCompare: "/payment-settings",
                exact: false,
                classesToApply: ActiveClassName,
              })}  `}
            >
              <MdOutlinePayments className="text-2xl max-md:3xl" stroke="2" />
              <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]  md:hidden leading-relaxed ">
                Configs
              </p>
              {Expanded && (
                <p className="max-md:hidden">Payment Configuration</p>
              )}
            </Link>
          </SubSidebarLinks_Shrinked>
        </RoleBasedAccess>
      </NestedNavigationWrapper>

      <NestedNavigationWrapper
        labels={[{ label: "Yearly Sessions", url: "/sessions" }]}
      >
        <SubSidebarLinks_Shrinked label="Yearly Sessions and Year cycles">
          <div
            className={`${EachLinkClass} ${
              Expanded ? "px-4" : "justify-center"
            }  ${ValidateRoute({
              toCompare: "/sessions",
              exact: false,
              classesToApply: ActiveClassName,
            })}  `}
          >
            <FaCalendarMinus className="text-2xl max-md:3xl" />
            <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]  md:hidden leading-relaxed ">
              Sessions
            </p>
            {Expanded && <p className="max-md:hidden">Yearly Sessions</p>}
          </div>
        </SubSidebarLinks_Shrinked>
      </NestedNavigationWrapper>

      <NestedNavigationWrapper
        labels={[
          { label: "General Stats", url: "/stats" },
          { label: "Student Fee Report", url: "/stats/feereport" },
        ]}
      >
        <RoleBasedAccess roleToGiveAccess={["chief admin"]}>
          <SubSidebarLinks_Shrinked label="Academic Stats">
            <Link
              to={"/stats"}
              className={`${EachLinkClass} ${
                Expanded ? "px-4" : "justify-center"
              }  ${ValidateRoute({
                toCompare: "/stats",
                exact: false,
                classesToApply: ActiveClassName,
              })}  `}
            >
              <FaRegChartBar className="text-2xl max-md:3xl" />
              <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]  md:hidden leading-relaxed ">
                Stats
              </p>
              {Expanded && <p className="max-md:hidden">Home</p>}
            </Link>
          </SubSidebarLinks_Shrinked>
        </RoleBasedAccess>
      </NestedNavigationWrapper>
    </ul>
  );
};

export default SidebarLinks;
