import { Route, Routes } from "react-router-dom";
import ClassDivision from "./ClassDivision.dash";
import HeaderSection from "./Components/Header/HeaderSection.dash";
import TeacherDivision from "./TeacherDivision.dash";
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess";
const LandingPage = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <HeaderSection />
      <div className="flex">
        <Routes>
          <Route index path="/classes" element={<ClassDivision />} />
          <Route index path="/" element={<ClassDivision />} />
          <Route
            path="/staffs"
            element={
              <RoleBasedAccess
                roleToGiveAccess={"chief admin"}
                redirect="/dashboard"
              >
                <TeacherDivision />
              </RoleBasedAccess>
            }
          />
        </Routes>
      </div>
    </section>
  );
};

export default LandingPage;
