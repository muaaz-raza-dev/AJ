import { Link } from "react-router-dom"

const FeeConfigCTACard = () => {
  return (
<div className=" flex gap-6   bg-[var(--box)] shadow text-darker rounded-lg  p-4  justify-center items-start">
    <div className="w-[80%]">
  <h2 className="text-xl font-bold ">Configure Payment Setting </h2>
  <p className="text-sm ">Ensure to setup payment settings before collecting payments.</p>
    </div>
    <div className="flex flex-col gap-2 self-end">
    <Link to={"/payments/config/setup"} className="text-sm items-center px-2 py-1 bg-[var(--bg)] rounded-md text-dark  font-bold shadow-sm hover:bg-gray-100">
    Visiualize
  </Link>
  <Link to={"/payments/config/setup"} className="text-sm items-center px-2 bg-dark py-1 rounded-md text-white font-bold shadow-sm ">
    Configure 
  </Link>
    </div>
  
</div>


  )
}

export const SessionConfigCTACard = () => {
    return (
  <div className=" flex gap-6   bg-darker shadow text-white rounded-lg  p-4  justify-center items-start ">
      <div className="">
    <h2 className="text-xl font-bold ">Start new session</h2>
    <p className="text-xs ">End up current session and start new session.</p>
      </div>
    <Link  to={"registeration"}  className="inline-flex self-end items-center px-2 bg-white rounded-md text-darker font-bold shadow-sm hover:bg-gray-100">
      Setup
    </Link>
  </div>
    )
  }

export default FeeConfigCTACard