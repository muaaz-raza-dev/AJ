import useLoadGlobalState from "@/Hooks/Global/useLoadGlobalState"
import SidebarAdminProfile from "./SIdebarAdminProfile"
import SidebarLinks from "./SidebarLinks"
const SidebarFile = () => {
  useLoadGlobalState()
  return (
    <div className="w-full h-full sticky p-2 text-white flex flex-col max-md:flex-row justify-between">
      <div className="max-md:w-full">
    <div className="flex gap-x-2  max-md:hidden py-8 center  text-xl">
        <div className=" border border-[white]  rounded-full bg-[var(--bg)] text-[var(--dark)] center aspect-square w-10 font-bold">AJ</div>
        <p className="">Foundation School</p>
    </div>
    <SidebarLinks/>
    </div>
    <SidebarAdminProfile/>
    </div>
  )
}

export default SidebarFile
