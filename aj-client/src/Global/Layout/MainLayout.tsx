import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarFile from "../Sidebar/SidebarFile";
import Header from "../Header/Header";
import StudentsDirectoryFile from "@/Pages/Students Directory/StudentDirectoryFile.std";
import { useAppSelector } from "@/app/ReduxHooks";
const TransactionsFile = React.lazy(() => import("@/Pages/Transactions/TransactionsFile.tr"));
const ClassesFile = React.lazy(() => import("@/Pages/Classes/DashboardFile.dash"));
const YearSessionsFile = React.lazy(() => import("@/Pages/Year Sessions/YearSessionsFile.session"));
const PaymentFile = React.lazy(() => import("@/Pages/Payments/PaymentFile.pay"));
const SettingsFile = React.lazy(() => import("@/Pages/Settings/SettingsFile.set"));
import RoleBasedAccess from "../Middleware Hooks/RoleBasedAccess";
import CustomSuspense from "../Middleware Hooks/CustomSuspense";
import StatsFile from "../../Pages/Statistics/StatsFile.stat";
import GuideFile from "@/Pages/Guide/GuideFile.guide";

const MainLayout = () => {
  return (
    <>
    <main className=" md:flex flex-row-reverse dark:bg-[var(--bg-dark)] min-h-screen w-full max-md:pb-24 ">
        <MainLayoutRoutes />
      </main>
        <SidebarFile />
    </>
  );
};

const MainLayoutRoutes = () => {
  const Expanded = useAppSelector((s) => s.global.Expand_Navbar);
  return (
    <main
    className={` ${
      Expanded ? "md:w-[80%]" : "md:w-[94%]"
      }  max-md:w-[100%] dark:bg-[var(--bg-dark)] bg-[var(--bg)]  md:px-6 max-md:px-2 min-h-screen`}
      >
    <Header />
    <Routes>
      <Route  element={
       <RoleBasedAccess roleToGiveAccess={["chief admin"]}>
       <StatsFile/>
       </RoleBasedAccess>
        } path="/stats/*" />

      <Route element={
        <CustomSuspense>
          <StudentsDirectoryFile />
        </CustomSuspense>
        }  path="/students/*" />
      <Route element={<StudentsDirectoryFile />} index path="/" />

      <Route element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
            <CustomSuspense>
            <TransactionsFile />
            </CustomSuspense>
          </RoleBasedAccess>
        }
        path="/transactions/*"
        />

      <Route element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
            <CustomSuspense>
            <PaymentFile />
            </CustomSuspense>
          </RoleBasedAccess>
        }
        path="/payment-settings/*"
        />

      <Route element={
        <CustomSuspense>
          <ClassesFile />
        </CustomSuspense>
        } path="/dashboard/*" />


      <Route element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
          <CustomSuspense>
            <YearSessionsFile />
          </CustomSuspense>
          </RoleBasedAccess>
        }
        path="/sessions/*"
        />

      <Route element={
        <CustomSuspense>
          <SettingsFile />
        </CustomSuspense>
        } path="/settings/*" />
        
      <Route element={
        <CustomSuspense>
          <GuideFile/>
        </CustomSuspense>
        } path="/guide/*" />

    </Routes>
        </main>
  );
};
export default MainLayout;
