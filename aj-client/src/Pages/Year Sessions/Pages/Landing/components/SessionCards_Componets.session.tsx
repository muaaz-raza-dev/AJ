import { useAppSelector } from '@/app/ReduxHooks'
import SessionCard from './SessionCard.session'

const SessionCards_Componets = () => {
  let sessions  = useAppSelector(s=>s.sessions.payload.Sessions.Filtered)
  return (
    <main className="flex gap-4  w-full flex-col min-h-[70vh] overflow-y-auto">
    <div className="flex gap-4  w-full flex-wrap ">
      {
        sessions.length === 0 &&(
          <div className="flex justify-center items-center w-[100%] h-[100%] bg-[var(--bg)]">
            <h1 className="text-2xl text-center text-gray-500 font-black">No Sessions Found</h1>
          </div>
        )
      }
      {
        sessions.map(session=><SessionCard key={session.session_name} data={session}/>)
      }
</div>
</main>
  )
}

export default SessionCards_Componets