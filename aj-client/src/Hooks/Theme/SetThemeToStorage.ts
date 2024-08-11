import { useAppDispatch } from "@/app/ReduxHooks"
import { InsertGlobalValues } from "@/app/Slices/globalSlice"

const SetThemeToStorage = () => {
let DarkMode  =  localStorage.getItem("DarkMode")? JSON.parse(localStorage.getItem("DarkMode")||"") : false
if(!DarkMode){ 
 localStorage.setItem("DarkMode",JSON.stringify(false))
 DarkMode  = JSON.parse(localStorage.getItem("DarkMode")||"") 
}
return DarkMode
}

export const useToggleTheme = ()=>{
let activeTheme = JSON.parse(localStorage.getItem("DarkMode")||JSON.stringify(false)) ==true ? "dark":"light"
let dispatch =useAppDispatch()
function toggleTheme(DarkMode:boolean){
localStorage.setItem("DarkMode",JSON.stringify(DarkMode))
dispatch(InsertGlobalValues({DarkMode}))
}

return {toggleTheme,activeTheme}
}

export default SetThemeToStorage