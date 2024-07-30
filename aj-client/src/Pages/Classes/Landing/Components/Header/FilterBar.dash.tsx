import SearchBar from "./SearchBar.dash"
import SpecialFilters from "./SpecialFilters.dash"
const FilterBar = () => {
  return (
    <div className='flex max-md:flex-col gap-2'>
         <SearchBar/>
         <SpecialFilters/>
    </div>
  )
}



export default FilterBar