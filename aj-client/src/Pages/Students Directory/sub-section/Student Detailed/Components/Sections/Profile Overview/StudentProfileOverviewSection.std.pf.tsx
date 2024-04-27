import StdCurrentMonthStats from './StdCurrentMonthStats'
import StdProfileTransactions from './StdProfileTransactions.std.pf'
import StdSpecificOptions from './StdSpecificOptions.std.pf'
import StudentsOverViewHeader from './StudentsOverViewHeader.std.pf'


const StudentProfileOverviewSection = () => {
  return (
    <div className='flex flex-col gap-y-2 px-4'>
      <StudentsOverViewHeader/>
      <StdSpecificOptions/>
      <StdCurrentMonthStats/>
      <StdProfileTransactions/>
    </div>
  )
}

export default StudentProfileOverviewSection
