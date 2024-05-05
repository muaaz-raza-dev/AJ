import CardSection from "./Components/Cards/CardSection.dash"
import HeaderSection from "./Components/Header/HeaderSection.dash"
import SideDetailsSection from "./Components/SideDetails/SideDetailsSection.dash"
const LandingPage = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <HeaderSection/>
      <div className="flex">
      <CardSection/>
      <SideDetailsSection/>
      </div>
    </section>
  )
}

export default LandingPage