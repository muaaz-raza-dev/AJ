import { useAppSelector } from "@/app/ReduxHooks"
import Notes_send from "./Notes_send.class"
import { ArrowRight, EditIcon, UserPlus } from "lucide-react"
import { FC } from "react"
import { IstudentShort } from "@/app/Types/IstudentsDir.t"
const Teacher_Details = () => {
  let Students = useAppSelector(s=>s.classDetailed.payload.Students)
  return (
    <div className='w-[35%] flex flex-col gap-2 '>
    <Notes_send/>
    <div className="flex bg-[var(--box)] rounded-md flex-col gap-7 p-4">

      <div className="flex  items-center justify-between  hFont font-bold text-xl  rounded-md  ">
        <h1>Recent Admissions</h1>
      <button className="text-dark font-medium flex gap-1 text-sm"><UserPlus size={18}/> Add Students</button>

</div>
<div className="flex flex-col gap-2">
 {
  Students.length ==0 ?
  <p className="center text-gray-500 text-xl font-black">
    No Admissions yet. 
  </p>
  :
   Students.map(data=><EachStudent_Comp data={data}/>)
  }
  </div>
  </div>


                
    </div>
  )
}

const EachStudent_Comp :FC<{data:IstudentShort}>= ({data})=>{
  return       <div className="flex justify-between border-b py-3 ">

<div className="">
  <div className="flex gap-4 items-center">
    {/* <img src="/images/teacher_sample.jpg" alt="" className="w-6 h-6 rounded-full"/> */}
    <h1 className="font-medium">{data.FirstName} {data.LastName}</h1>
</div>
</div>
<div className="text-gray-600 flex gap-3 ">
  <button><EditIcon size={16}   className="hover:text-dark transition-colors"/></button>
  <button><ArrowRight size={16} className="hover:text-dark transition-colors"/></button>
</div>

  
</div>
}

export default Teacher_Details