import StudentAdvancedFilters from "./AdvancedFilters.std"
import SearchBarFilter from "./SearchBarFilter.std"

const StudentsFilterHeader = () => {
  return (
    <div className="  py-4 max-md:pb-2 max-md:pt-0 px-2 justify-between max-md:flex-col gap-2 max-md:justify-start dark:bg-darker   w-full gap-x-1 rounded-md flex">
      <SearchBarFilter />
      <StudentAdvancedFilters />
    </div>
  )
}

export default StudentsFilterHeader
