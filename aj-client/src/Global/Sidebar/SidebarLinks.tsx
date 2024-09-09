import { Link } from "react-router-dom";
import useActiveRoute from "@/Hooks/Common/ActiveRoute";
import {  FaReceipt, FaRegChartBar, FaSchool, FaUserTie } from "react-icons/fa";
import { useAppSelector } from "@/app/ReduxHooks";
import SubSidebarLinks_Shrinked from "./SubSidebarLinks";
import { GiNotebook } from "react-icons/gi";
import { MdAddCircleOutline, MdCurrencyExchange, MdGroupAdd, MdOutlinePayments } from "react-icons/md";
import { FaBookOpenReader, FaCalendarDays, FaCalendarMinus, FaUsersGear, FaUsersLine } from "react-icons/fa6";
import RoleBasedAccess from "../Middleware Hooks/RoleBasedAccess";
import NestedNavigationWrapper from "./Components/NestedNavigationWrapper";
import { BsCurrencyExchange, BsPersonFillAdd } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
const SidebarLinks = () => {
  const { ValidateRoute } = useActiveRoute();
  const Expanded = useAppSelector((e) => e.global.Expand_Navbar);
  const ActiveClassName =
    "!bg-[var(--light)] !text-[var(--dark)] !dark:text-light border-none rounded-md";
  const EachLinkClass = `md:w-full max-md:px-2 duration-50
             md:hover:bg-[var(--light)] md:hover:border-transparent md:hover:text-[var(--dark)]
            text-[var(--light)] rounded  transition-all   items-center border-[var(--primary)] md:py-3 max-md:py-2 
            flex gap-x-4 max-md:flex-col gap-y-1`;
  const SubIconStyle ="text-dark  text-xl max-md:3xl"
  return (
    <ul
      className={`flex w-full  items-center  h-full flex-col max-md:flex-row ${
        Expanded ? "gap-y-1" : "gap-y-3"
      } gap-x-2   max-md:justify-around  `}
    >
      <NestedNavigationWrapper
        labels={[
          {
            label: "Register Student",
            url: "/students/registeration",
            icon: (
              <BsPersonFillAdd
                size={22}
                className={SubIconStyle}
              />
            ),
          },
          {
            label: "Students",
            url: "/students",
            icon: (
              <FaUsersLine
                size={22}
                className={SubIconStyle}
              />
            ),
          },
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
          {
            label: "Transactions",
            url: "/transactions",
            icon: (
              <MdCurrencyExchange className={SubIconStyle} />
            ),
          },
          { label: "Create Transaction", url: "/transactions/create",icon:<FaReceipt className={SubIconStyle} /> },
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
          { label: "Daily Diary", url: "/diary" ,icon:<FaBookOpenReader className={SubIconStyle} />},
          { label: "Create Diary", url: "/diary/create" ,icon:<GiNotebook  className={SubIconStyle} />},
        ]}
      >
          <SubSidebarLinks_Shrinked label="Diary & Annoucments">
            <Link
              to={"/diary"}
              className={`${EachLinkClass} ${
                Expanded ? "px-4" : "justify-center"
              }  ${ValidateRoute({
                toCompare: "/diary",
                exact: false,
                classesToApply: ActiveClassName,
              })}  `}
            >
              <FaBookOpenReader  className="text-2xl max-md:3xl" />
              <p className="max-md:text-[0.8rem] max-[400px]:text-[0.67rem]  md:hidden leading-relaxed ">
              Diary 
              </p>
              {Expanded && <p className="max-md:hidden">Diary & Annoucements</p>}
            </Link>
          </SubSidebarLinks_Shrinked>
      </NestedNavigationWrapper>

      <NestedNavigationWrapper
        labels={[
          { label: "Classes", url: "/dashboard/classes" ,icon:<FaSchool className={SubIconStyle} /> },
          { label: "Teacher & Staffs ", url: "/dashboard/staffs",roleToAccess:"chief admin", icon:<FaUserTie className={SubIconStyle} />},
          { label: "Register Class", url: "/dashboard/class/register",roleToAccess:["admin","chief admin"], icon:
          <MdAddCircleOutline   className={SubIconStyle}/> },
          { label: "Register Staff", url: "/dashboard/teacher/register",roleToAccess:"chief admin", icon:<MdGroupAdd className={SubIconStyle} />},
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
        <RoleBasedAccess roleToGiveAccess={ "chief admin"}>
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

      <RoleBasedAccess roleToGiveAccess={["chief admin"]}>
      <NestedNavigationWrapper
        labels={[{ label: "Yearly Sessions", url: "/sessions",icon:<FaCalendarDays className={SubIconStyle} /> }]}
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
        </RoleBasedAccess>





      <NestedNavigationWrapper
        labels={[
          { label: "General Stats", url: "/stats" ,icon:<IoStatsChart className={SubIconStyle} />},
          { label: "Student Fee Report", url: "/stats/feereport" ,icon:<FaUsersGear className={SubIconStyle} />},
          { label: "Detailed Revenue Report", url: "/stats/revenue" , icon:<BsCurrencyExchange className={SubIconStyle} /> },
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
              {Expanded && <p className="max-md:hidden">Stats and Reports</p>}
            </Link>
          </SubSidebarLinks_Shrinked>
        </RoleBasedAccess>

      </NestedNavigationWrapper>
      
    </ul>
  );
};

export default SidebarLinks;
