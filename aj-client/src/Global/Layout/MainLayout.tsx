import { Route, Routes } from "react-router-dom"
import SidebarFile from "../Sidebar/SidebarFile"
import Header from "../Header/Header"
import RegisterationFile from "@/Pages/Registeration/RegisterationFile.reg"
import TransactionsFile from "@/Pages/Transactions/TransactionsFile.tr"
import StudentsDirectoryFile from "@/Pages/Students Directory/StudentDirectoryFile.std"
import ClassesFile from "@/Pages/Classes/Dashboard.dash"
import { useAppSelector } from "@/app/ReduxHooks"


const MainLayout = () => {
  let Expanded = useAppSelector(s=>s.global.Expand_Navbar)
  return (
    <main className=" flex max-md:flex-col-reverse min-h-screen">
      <aside className={`${Expanded?"md:w-[20%]":"md:w-[6%]"} max-md:w-[100%]  sticky left-0  top-0 bg-[var(--dark)]  max-md:h-26 md:h-screen`}>
        <SidebarFile/>
        </aside>
      <main className={` ${Expanded?"md:w-[80%]":"md:w-[94%]"}  max-md:w-[100%] bg-[var(--bg)] px-6`}>
<Header/>
        <Routes>
            <Route index element={<h1>I am landing Page</h1>} path="/"/> 
            <Route element={<RegisterationFile/>} path="/registeration/*"/> 
            <Route element={<StudentsDirectoryFile/>} path="/students/*"/> 
             <Route element={<TransactionsFile/>} path="/transactions/*"/> 
             <Route element={<ClassesFile/>} path="/dashboard/*"/> 
        </Routes>
      </main>
    </main>
  )
}

export default MainLayout
