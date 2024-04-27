import { BsThreeDots } from "react-icons/bs"
import moment from "moment"
import { useAppSelector } from "@/app/ReduxHooks"

const StudentsOverViewHeader = () => {
  let {Student:{DOA,Class,GRNO,FirstName,LastName,photo},Dues} = useAppSelector(s=>s.stdExclusive.overview) //React Context
  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-[var(--box)]  items-center justify-center pb-2 gap-y-3'>
      <div className="w-full h-20 bg-[var(--dark)] flex justify-end ">
        <button className="hover:bg-[var(--box)] transition-colors center  group w-8 h-9 m-3 rounded-md ">
      <BsThreeDots className=" text-white group-hover:text-[var(--darker)]" size={24}/>
        </button>
      </div>
      <div className="flex w-24 -mt-14 aspect-square rounded-full bg-[var(--primary)] border-2  p-0.5">
      <img className='rounded-full border-emerald-600 border' src={photo||"/images/sample.png"} />
      </div>
      <div className="">
      <h1 className='hFont font-bold text-lg'>{FirstName+ ' '+ LastName}</h1>
      <p className='text-[var(--dark)] text-center text-sm font-extrabold hFont '>{GRNO}</p>
      </div>
      <div className="flex gap-x-6 justify-between px-4 py-1 bg-[var(--primary)]  rounded">
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Class</p>
        <b className="font-extrabold">{Class}</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Student For</p>
        <b className="font-extrabold">{moment(DOA).fromNow()}</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Dues</p>
        <b className="font-extrabold text-red-800">{Dues}</b>
      </div>
      </div>
    </div>
  )
}



export default StudentsOverViewHeader

