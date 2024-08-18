import RoleBasedAccess from '@/Global/Middleware Hooks/RoleBasedAccess'
import StdProfileTransactions from './StdProfileTransactions.std.pf'
import StudentsOverViewHeader from './StudentsOverViewHeader.std.pf'


const StudentProfileOverviewSection = () => {
  return (
    <div className='flex flex-col gap-y-2 '>
      <StudentsOverViewHeader/>
      <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
      <StdProfileTransactions/>
      </RoleBasedAccess>
    </div>
  )
}

export default StudentProfileOverviewSection
