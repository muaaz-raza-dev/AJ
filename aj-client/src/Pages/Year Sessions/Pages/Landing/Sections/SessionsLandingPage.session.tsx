
import HeaderLandingSesstion from "../components/HeaderLandingSesstion.session"
import SessionCards_Componets from "../components/SessionCards_Componets.session"
import useFetchSessions from "@/Hooks/Yearly_Session/useFetchSession"


const SessionsLandingPage = () => {
  useFetchSessions()
  return (
    <div className="flex flex-col">
  <HeaderLandingSesstion/>
  <SessionCards_Componets/>
        </div>
  )
}

export default SessionsLandingPage