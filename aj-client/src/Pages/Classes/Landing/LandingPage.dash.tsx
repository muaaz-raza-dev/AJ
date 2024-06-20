import ClassDivision from "./ClassDivision.dash"
import HeaderSection from "./Components/Header/HeaderSection.dash"
import TeacherDivision from "./TeacherDivision.dash"
const LandingPage = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <HeaderSection/>
      <div className="flex">
      {/* <ClassDivision/> */}
      <TeacherDivision/>
      </div>
    </section>
  )
}

export default LandingPage