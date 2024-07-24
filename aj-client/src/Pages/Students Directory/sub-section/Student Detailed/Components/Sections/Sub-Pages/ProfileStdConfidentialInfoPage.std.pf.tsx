import StdProfileNavigationHeader from "./StdProfileNavigationHeader.std.pf"
import StudentContactDetails from "./StudentContactDetails.std.pf"
import StudentDetailsKeyValuePairs from "./StudentDetailsKeyValuePairs.std.pf"
const ProfileStdConfidentialInfoPage = () => {
  return (
    <>
    <section className='bg-[var(--box)] dark:bg-darker rounded-md '>
              <StdProfileNavigationHeader navigation title={"Exclusive Student details"}/>
              < StudentDetailsKeyValuePairs/>              
    </section>
    <section className='bg-[var(--box)]  rounded-md dark:bg-darker  '>
              <StdProfileNavigationHeader title={"Contact details"}/>
              <StudentContactDetails/>
    </section>
    </>
  )
}

export default ProfileStdConfidentialInfoPage

