import SearchBar from "./SearchBar.dash"
import SpecialFilters from "./SpecialFilters.dash"
const FilterBar = () => {
  return (
    <div className='flex  gap-4'>
         <SearchBar/>
         <SpecialFilters/>
    </div>
  )
}



export default FilterBar