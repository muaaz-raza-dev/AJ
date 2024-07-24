import { useAppSelector } from "@/app/ReduxHooks"

const StudentsOverViewHeader = () => {
  let {Classes,Sections} =useAppSelector(s=>s.global)
  let {Student:{CurrentClass,CurrentSection,FirstName,LastName,GRNO,photo},Dues} = useAppSelector(s=>s.stdExclusive.overview) //React Context
  return (
    <div className='flex  py-2  from-darker to-darker  bg-gradient-to-r rounded-lg overflow-hidden bg-[var(--box)]  items-center justify-between gap-6 px-4 gap-y-3'>
      <div className="flex gap-6 items-center">
      <div className="flex w-20  aspect-square  border rounded-md">
      <img className='rounded-md' src={photo||"/images/sample.png"} />
      </div>
      <div className="flex gap-5 text-3xl text-white">
      <p className='text-gray-200  text-center  font-bold hFont '>#{GRNO}</p>
      <h1 className='hFont font-bold '>{FirstName+ ' '+ LastName}</h1>
      </div>
      </div>
      
      <div className="flex gap-x-6 justify-between px-4 py-1 text-white  rounded">
      <div className="flex items-center flex-col">
        <p className="text-sm font-medium text-gray-200">Current Class</p>
        <b className="font-extrabold">{Classes[CurrentClass]}</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-sm font-medium text-gray-200">Current Section</p>
        <b className="font-extrabold">{Sections?.[CurrentClass]?.[CurrentSection]}</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-sm font-medium text-red-200">Dues</p>
        <b className="font-extrabold">{Dues} PkR</b>
      </div>
      </div>
    </div>
  )
}



export default StudentsOverViewHeader

