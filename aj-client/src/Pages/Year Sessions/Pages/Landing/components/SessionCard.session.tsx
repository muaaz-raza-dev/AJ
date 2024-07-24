import { Isessions } from "@/app/Types/Isessions"
import { CalendarCheck, Shapes } from "lucide-react"
import moment from "moment"
import { FC } from "react"

const SessionCard:FC<{data:Isessions}> = ({data}) => {
  return (
    <section className="rounded overflow-hidden shadow flex gap-3 bg-[var(--box)] w-[40%]  h-max ">
      <header className=" w-[35%] SessionBg ">
        <div className="bg-[black] relative">
          {data.isActive?
        <div className="absolute bg-[var(--success)] top-2 hFont p-1 text-xs rounded-md font-medium left-2">Fresh</div> :
        <div className="absolute bg-[var(--warning)] top-2 hFont p-1 text-xs rounded-md font-medium left-2">Past</div> 
      }
        </div>
      </header>

      <main className="bg-[var(--box)] w-[75%] rounded-md -mt-2 p-2 flex flex-col gap-2 py-2 pt-4">

        <div className="flex justify-between mt-1 w-full flex-col ">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
      <h1 className="font-bold text-xl" >{data.session_name}</h1>
      <div className="hFont text-sm bg-darker rounded text-white px-2">{data.acedmic_year}</div>
            </div>
<div className="flex gap-1 items-center">

      <div className="bg-gray-200 px-2 rounded text-sm w-max flex items-center gap-1">
        <CalendarCheck size={14}/>Starts
        <b>
          {moment(data.start_date).format("MMMM Y")}
        </b>
         </div>
         {data.end_date&&
         <div className="bg-gray-200 px-2 rounded text-sm w-max flex items-center gap-1">
        <CalendarCheck size={14}/>Ends
        <b>
        {moment(data.end_date).format("MMMM Y")}
        </b>
         </div>
        }
</div>

<div className="flex gap-1 items-center">
      <div className="bg-gray-200  px-2 rounded text-sm w-max flex items-center gap-1">
      <Shapes size={14} />
        <b>
          {data.Classes.length} classes
        </b>
         </div>
         <div className="bg-gray-200  px-2 rounded text-sm w-max flex items-center gap-1">
      <Shapes size={14} />
        <b>
          42 sections
        </b>
         </div>
         
</div>

</div>
        </div>
          <div className="flex gap-2 justify-end">
          <button className="font-bold text-sm text-dark  py-1 rounded-md bg-[var(--primary)]    border-[var(--dark)] border px-5 transition-colors flex gap-1 items-center">
            Edit Details
          </button>
          </div>
      </main>
    </section>
  )
}

export default SessionCard