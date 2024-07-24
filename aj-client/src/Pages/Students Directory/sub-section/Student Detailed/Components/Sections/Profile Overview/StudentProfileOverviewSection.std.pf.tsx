import StdProfileTransactions from './StdProfileTransactions.std.pf'
import StudentsOverViewHeader from './StudentsOverViewHeader.std.pf'


const StudentProfileOverviewSection = () => {
  return (
    <div className='flex flex-col gap-y-2 '>
      <StudentsOverViewHeader/>
      <StdProfileTransactions/>
    </div>
  )
}

export default StudentProfileOverviewSection
