import { Logout } from "@/app/Slices/CredentialSlice"
import { useAppDispatch } from "@/app/ReduxHooks"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { CookieKey } from "@/app/Common/DefaultCredits"

const useLogout = () => {
    let dispatch =useAppDispatch()
    let navigate = useNavigate()
    function logOut() {
        dispatch(Logout())
        Cookies.remove(CookieKey)
        navigate("/login")
    }
    return {logOut}
}

export default useLogout
