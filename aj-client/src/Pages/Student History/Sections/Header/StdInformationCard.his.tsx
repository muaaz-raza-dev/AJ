import { useAppSelector } from "@/app/ReduxHooks"
import moment from "moment"
import { Link } from "react-router-dom"

const StdInformationCard = () => {
    let {FirstName,LastName,DOA,GRNO} =useAppSelector(s=>s.studentHistory.payload.studentInformation)
  return (
    <div className="flex justify-between bg-gradient-to-bl to-dark_dimmer   from-dark overflow-hidden relative w-[33%]  rounded-xl shadow-md   gap-2  h-32">
    <div className="flex flex-col gap-1 justify-between  w-full p-4 py-6">
        <div className="flex gap-2 hFont text-sm items-center font-bold">
        <h1 className="text-3xl font-bold">{FirstName } {LastName}</h1>
        </div>
        <p className="hFont text-[0.9rem] font-bold">Student for {moment(DOA).fromNow()}
</p>
        <div className="flex justify-end gap-2 font-bold">
            <Link to={`/students/${GRNO}`} className="rounded-full bg-black px-4 py-1 text-white text-sm">Details</Link>
            <button className="rounded-full bg-[var(--box)] px-4 py-1 text-dark text-sm">Add payment</button>
        </div>
    </div>
</div>
  )
}

export default StdInformationCard