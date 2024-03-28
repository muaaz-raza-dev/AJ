import StudentAdvancedFilters from "./AdvancedFilters.std"
import SearchBarFilter from "./SearchBarFilter.std"

const StudentsFilterHeader = () => {
  return (
    <div className="  py-4 px-4 justify-between bg-[var(--box)] shadow w-full gap-x-1 rounded-md flex">
      <SearchBarFilter/>
      <StudentAdvancedFilters/>
    
    </div>
  )
}

export default StudentsFilterHeader
