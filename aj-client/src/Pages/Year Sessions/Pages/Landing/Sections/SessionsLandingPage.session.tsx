import { Link } from "react-router-dom"
import SessionCards_Componets from "../components/SessionCards_Componets.session"
import useFetchSessions from "@/Hooks/Yearly_Session/useFetchSession"

const SessionsLandingPage = () => {
  useFetchSessions()
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Link to={"/registeration"} className="bg-dark rounded-md text-white px-3 p-1"> Register new session </Link>
      </div>
  <SessionCards_Componets/>
        </div>
  )
}

export default SessionsLandingPage