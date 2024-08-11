import { Isessions } from "@/app/Types/Isessions"
import { ArrowUpRight, CalendarCheck, Shapes } from "lucide-react"
import moment from "moment"
import { FC } from "react"
import { Link } from "react-router-dom"

const SessionCard:FC<{data:Isessions}> = ({data}) => {
  
  return (
    <section className={`rounded overflow-hidden shadow flex dark:bg-dark dark:text-white gap-1 bg-[var(--box)] w-[40%] max-md:w-full h-max ${!data.isActive&&"grayscale"}`}>
      <header className=" w-[35%]  SessionBg ">
        <div className="bg-[black] relative">
          {data.isActive?
        <div className="absolute bg-[var(--success)] text-black top-2 hFont p-1 text-xs rounded-md font-medium left-2">Fresh</div> :
        <div className="absolute bg-[var(--warning)] text-black top-2 hFont p-1 text-xs rounded-md font-medium left-2">Past</div> 
      }
        </div>
      </header>

      <main className="bg-[var(--box)] dark:bg-dark dark:text-white w-[75%] rounded-md -mt-2 p-1 flex flex-col gap-2 py-2 pt-4">

        <div className="flex justify-between mt-1 w-full flex-col ">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
      <h1 className="font-bold text-xl" >{data.session_name}</h1>
      <div className="hFont text-sm bg-darker rounded text-white px-2">{data.acedmic_year}</div>
            </div>
<div className="flex gap-1 items-center flex-wrap">

      <div className="bg-gray-200 dark:bg-dark_dimmer  px-2 rounded text-sm w-max flex items-center gap-1 whitespace-nowrap">
        <CalendarCheck size={14}/>Starts
        <b>
          {moment(data.start_date).format("MMMM Y")}
        </b>
         </div>
         {data.end_date&&
         <div className="bg-gray-200 dark:bg-dark_dimmer  px-2 rounded text-sm w-max flex items-center gap-1 whitespace-nowrap">
        <CalendarCheck size={14}/>Ends
        <b>
        {moment(data.end_date).format("MMMM Y")}
        </b>
         </div>
        }
</div>

<div className="flex gap-1 items-center flex-wrap">
      <div className="bg-gray-200 dark:bg-dark_dimmer   px-2 rounded text-sm w-max flex items-center gap-1">
      <Shapes size={14} />
        <b>
          {data.Classes.length} classes
        </b>
         </div>
         <div className="bg-gray-200 dark:bg-dark_dimmer   px-2 rounded text-sm w-max flex items-center gap-1">
        <b>
       
        </b>
         </div>
         
</div>

</div>
        </div>
          <div className="flex gap-2 justify-end">
          <Link to={`edit/${data?._id}`} className="font-bold text-sm text-dark dark:!text-white dark:!bg-darker  py-2 max-md:py-1  rounded-md bg-light   
          border-[var(--dark)] border px-5 max-md:px-2 max-md:text-xs transition-colors  flex gap-1 items-center">
            Edit Details <ArrowUpRight size={18}/>
          </Link>
          </div>
      </main>
    </section>
  )
}

export default SessionCard