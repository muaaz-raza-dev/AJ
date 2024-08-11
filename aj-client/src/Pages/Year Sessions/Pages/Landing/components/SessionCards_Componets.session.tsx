import { useAppSelector } from '@/app/ReduxHooks'
import SessionCard from './SessionCard.session'
import useFetchSessions from '@/Hooks/Yearly_Session/useFetchSession'
import RequestLoading from '@/Global/Loaders/RequestLoding'

const SessionCards_Componets = () => {
  let sessions  = useAppSelector(s=>s.sessions.payload.Sessions.Filtered)
  let {isLoading} =useFetchSessions()
  return (
    <main className="flex gap-3  w-full flex-col min-h-[70vh] overflow-y-auto ">
    <div className="flex max-md:flex-col gap-4  w-full  ">
      
      {
       !isLoading&& sessions.length === 0 &&(
          <div className="flex justify-center items-center w-[100%] h-[100%] bg-[var(--bg)]">
            <h1 className="text-2xl text-center text-gray-500 font-black">No Sessions Registered</h1>
          </div>
        )
      }
      {isLoading?
      <div className="center w-full">
      <RequestLoading dark/>
      </div>
      :
        sessions.map(session=><SessionCard key={session.session_name} data={session}/>)
      }
</div>
</main>
  )
}

export default SessionCards_Componets