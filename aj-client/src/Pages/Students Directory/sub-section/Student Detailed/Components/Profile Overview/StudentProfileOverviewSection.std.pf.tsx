
import StdProfileTransactions from './StdProfileTransactions.std.pf'
import StudentsOverViewHeader from './StudentsOverViewHeader.std.pf'

const StudentProfileOverviewSection = () => {
  return (
    <div className='flex flex-col gap-y-8'>
      <StudentsOverViewHeader/>
      <StdProfileTransactions/>
    </div>
  )
}

export default StudentProfileOverviewSection
