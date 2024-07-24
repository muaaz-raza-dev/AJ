import Cookies from "js-cookie";
import { Icredits } from "../Types/Icredits.t";
export let CookieKey =import.meta.env.VITE_APP_SECRET_COOKIE_KEY

export let DefaultCredits:Icredits = {
    Info:{
        _id:"",
        username: "",
        Name: "",
        Role: "admin",
        email: "",
        LastLogin: []
        },
        isLogined:false,
        isLoading:Cookies.get(CookieKey)?true:false
}