import { useAppSelector } from "@/app/ReduxHooks"

import { ArrowRight, EditIcon, UserPlus } from "lucide-react"
import { FC } from "react"
import { IstudentShort } from "@/app/Types/IstudentsDir.t"
import { Link } from "react-router-dom"
const RecentAdmissions = () => {
  let Students = useAppSelector(s=>s.classDetailed.payload.Students)
  return (
    
    
    <div className="flex bg-[var(--box)] dark:bg-dark dark:text-white rounded-md flex-col gap-7 p-4">

      <div className="flex  items-center justify-between  hFont font-bold text-xl  rounded-md  ">
        <h1>Recent Admissions</h1>
      <Link to={"/students/registeration"} className="text-dark dark:text-white font-medium flex gap-1 text-sm"><UserPlus size={18}/> Add Students</Link>

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
<div className="text-gray-600 dark:text-gray-200 flex gap-3 ">
  <button><EditIcon size={16}   className="hover:text-darker dark:hover:text-gray-300 transition-colors"/></button>
  <button><ArrowRight size={16} className="hover:text-darker dark:hover:text-gray-300 transition-colors"/></button>
</div>

  
</div>
}

export default RecentAdmissions