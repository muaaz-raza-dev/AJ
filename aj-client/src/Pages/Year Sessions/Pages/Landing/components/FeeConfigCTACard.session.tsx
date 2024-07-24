import { useAppSelector } from "@/app/ReduxHooks"
import { Link } from "react-router-dom"

export const SessionConfigCTACard = () => {
  let {Sessions}=useAppSelector(s=>s.global)
  if(Object.keys(Sessions).length==0){
    return (
      <div className=" flex flex-col items-center gap-2  w-full from-darker to-dark bg-gradient-to-tl shadow text-white rounded-lg  p-4  justify-center  ">
      <div className="">
    <h2 className="text-3xl hFont font-bold ">Register Yearly Session</h2>
    <p className="text-sm text-center ">Setup the first session to get started.</p>
      </div>
    <Link  to={"registeration"}  className="inline-flex  items-center px-12 py-2 bg-white rounded-md text-darker font-bold shadow-sm hover:bg-gray-100">
      Setup 
    </Link>
  </div>
    )
  }
  }
