import { Route, Routes } from "react-router-dom"
import StdProfileNavigationHeader from "./StdProfileNavigationHeader.std.pf"
import StdFeeSectionPage from "./Fees/StdFeeSubSectionPage.std.pf"

const ProfileStdConfidentialInfoPage = () => {
  return (
    <section className='bg-[var(--box)] rounded-md h-[70%] '>
              <StdProfileNavigationHeader/>
              <Routes>
                <Route element={<StdFeeSectionPage/>} path="/" index />
              </Routes>
    </section>
  )
}

export default ProfileStdConfidentialInfoPage

