import { useAppSelector } from "@/app/ReduxHooks"
import { useToggleTheme } from "@/Hooks/Theme/SetThemeToStorage"
import { Popover, PopoverContent, PopoverTrigger } from "@/shdcn/components/ui/popover"
import { useState } from "react"
import {  MdDarkMode, MdLightMode } from "react-icons/md"
  

const ThemeToggle = () => {
    let {DarkMode} = useAppSelector(s=>s.global)
    let {toggleTheme} =useToggleTheme()
    const [open,setOpen] =useState(false)
    let DarkClass = "bg-dark text-white hover:bg-dark_dimmer";
    let LightClass = "bg-white text-dark";
  return (
    <Popover open={open}>
  <PopoverTrigger onClick={()=>setOpen(true)} >
    <div className="rounded-md p-2 hover:bg-dark hover:!text-white text-dark bg-white dark:bg-dark dark:text-white transition-colors">

  {
      DarkMode ? <MdDarkMode  className="dark:text-white  max-md:text-xl  md:text-xl " /> : 
      <MdLightMode  className="dark:text-white  max-md:text-xl text-xl " /> 
    }
    </div>

  </PopoverTrigger>
  <PopoverContent className={`w-[120px] border-darker  p-2 ${DarkMode?"bg-dark text-white":"!border-none"}`}>
  <div className="flex-col gap-1 flex w-full  ">
<button onClick={()=>{toggleTheme(false);setOpen(false)}} className={` text-start w-full font-medium py-0.5 rounded-md  px-2 ${DarkMode?DarkClass:LightClass}`}>Light</button>
<button onClick={()=>{toggleTheme(true);setOpen(false)}} className={`  ${DarkMode?DarkClass:LightClass} text-start w-full font-medium py-0.5 rounded-md  px-2 `}>Dark</button>
  </div>

  </PopoverContent>
</Popover>


  )
}

export default ThemeToggle