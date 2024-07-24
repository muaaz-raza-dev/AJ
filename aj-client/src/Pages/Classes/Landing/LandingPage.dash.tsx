import { Route, Routes } from "react-router-dom"
import ClassDivision from "./ClassDivision.dash"
import HeaderSection from "./Components/Header/HeaderSection.dash"
import TeacherDivision from "./TeacherDivision.dash"
const LandingPage = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <HeaderSection/>
      <div className="flex">
        <Routes>
        <Route index  path="/classes" element={ <ClassDivision/> }      />
        <Route index  element={ <ClassDivision/> }      />
        <Route path="/teachers" element={ <TeacherDivision/> }   />
        </Routes>
      </div>
    </section>
  )
}

export default LandingPage