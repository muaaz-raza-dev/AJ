import { useAppSelector } from "@/app/ReduxHooks"
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess"

const StudentsOverViewHeader = () => {
  const {Classes,Sections} =useAppSelector(s=>s.global)
  const {Student:{CurrentClass,CurrentSection,FirstName,LastName,GRNO,photo},Dues} = useAppSelector(s=>s.stdExclusive.overview) //React Context
  return (
    <div className='flex  py-2  from-darker to-darker  bg-gradient-to-r rounded-lg overflow-hidden bg-[var(--box)]  items-center justify-between gap-6 px-4 gap-y-3 max-md:flex-col'>
      <div className="flex gap-6 max-lg:gap-3 w-full items-center">
      <div className="flex w-20  aspect-square  border rounded-md">

      <img className='rounded-md' src={photo||"/images/sample.png"} />
      </div>
      <div className="flex gap-5 text-3xl max-sm:text-2xl max-sm:gap-2 text-white">

      <p className='text-gray-200  text-center  font-bold hFont '>#{GRNO}</p>
      <h1 className='hFont font-bold '>{FirstName+ ' '+ LastName}</h1>
      </div>
      </div>
      
      <div className="flex gap-x-6 justify-between max-md:self-end px-4 py-1 text-white whitespace-nowrap  rounded">
      <div className="flex items-center flex-col">
        <p className="text-sm font-medium text-gray-200">Current Class</p>
        <b className="font-extrabold">{Classes[CurrentClass]}</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-sm font-medium text-gray-200">Current Section</p>
        <b className="font-extrabold">{Sections?.[CurrentClass]?.[CurrentSection]}</b>
      </div>
      {
        <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
      <div className="flex items-center flex-col">
        <p className="text-sm font-medium text-red-200">Dues</p>
        <b className="font-extrabold">{Dues} PkR</b>
      </div>
        </RoleBasedAccess>
      }
      </div>
    </div>
  )
}



export default StudentsOverViewHeader

