import FilterBar from './FilterBar.dash'
import Menubar from './Menubar.dash'

const HeaderSection = () => {
  return (
    <header className="flex flex-col gap-3">
    <FilterBar/>
    <Menubar/>
  </header>
  )
}

export default HeaderSection