import { Route, Routes } from "react-router-dom";
import SidebarFile from "../Sidebar/SidebarFile";
import Header from "../Header/Header";
import TransactionsFile from "@/Pages/Transactions/TransactionsFile.tr";
import StudentsDirectoryFile from "@/Pages/Students Directory/StudentDirectoryFile.std";
import ClassesFile from "@/Pages/Classes/DashboardFile.dash";
import { useAppSelector } from "@/app/ReduxHooks";
import YearSessionsFile from "@/Pages/Year Sessions/YearSessionsFile.session";
import PaymentFile from "@/Pages/Payments/PaymentFile.pay";
import SettingsFile from "@/Pages/Settings/SettingsFile.set";
import RoleBasedAccess from "../Middleware/RoleBasedAccess";

const MainLayout = () => {
  return (
    <main className=" flex max-md:flex-col-reverse min-h-screen">
        <SidebarFile />
        <MainLayoutRoutes />
      </main>
  );
};

const MainLayoutRoutes = () => {
  let Expanded = useAppSelector((s) => s.global.Expand_Navbar);
  return (
    <main
    className={` ${
      Expanded ? "md:w-[80%]" : "md:w-[94%]"
      }  max-md:w-[100%] dark:bg-[var(--bg-dark)] bg-[var(--bg)] px-6`}
      >
    <Header />
    <Routes>
      <Route  element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
        <h1>Coming Soon ...</h1>
        </RoleBasedAccess>
        } path="/stats" />

      <Route element={<StudentsDirectoryFile />}  path="/students/*" />
      <Route element={<StudentsDirectoryFile />} index path="/" />

      <Route element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
            <TransactionsFile />
          </RoleBasedAccess>
        }
        path="/transactions/*"
        />

      <Route element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
            <PaymentFile />
          </RoleBasedAccess>
        }
        path="/payment-settings/*"
        />

      <Route element={<ClassesFile />} path="/dashboard/*" />


      <Route element={
          <RoleBasedAccess roleToGiveAccess={["admin", "chief admin"]}>
            <YearSessionsFile />
          </RoleBasedAccess>
        }
        path="/sessions/*"
        />

      <Route element={<SettingsFile />} path="/settings/*" />


    </Routes>
        </main>
  );
};
export default MainLayout;
