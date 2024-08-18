import RoleBasedAccess from '@/Global/Middleware Hooks/RoleBasedAccess'
import FilterBar from './FilterBar.dash'
import Menubar from './Menubar.dash'

const HeaderSection = () => {
  return (
    <header className="flex flex-col gap-3">
    <FilterBar/>
    <RoleBasedAccess redirect='/dashboard' roleToGiveAccess={"chief admin"}>
    <Menubar/>
    </RoleBasedAccess>
  </header>
  )
}

export default HeaderSection