import useLoadGlobalState from "@/Hooks/Global/useLoadGlobalState";
import SidebarAdminProfile from "./SIdebarAdminProfile";
import SidebarLinks from "./SidebarLinks";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { InsertGlobalValues } from "@/app/Slices/globalSlice";
const SidebarFile = () => {
  useLoadGlobalState();
  let toggle= useAppSelector(e=>e.global.Expand_Navbar)
  let dispatch = useAppDispatch()
  const Switcher =()=>{
    dispatch(InsertGlobalValues({Expand_Navbar:!toggle}))
  }
  return (
    <div className="w-full h-full sticky p-2 text-white flex flex-col max-md:flex-row justify-between">
      <div className="max-md:w-full">
        <div className="flex gap-x-2  max-md:hidden py-8 items-center justify-center text-xl">
          <button onClick={Switcher} className=" border border-[white]  rounded-full bg-[var(--bg)] text-[var(--dark)] center aspect-square w-10 font-bold">
            AJ
          </button>
          {toggle && <p className="">Foundation School</p>}
        </div>
        <SidebarLinks />
      </div>
      {toggle&&<SidebarAdminProfile />}
    </div>
  );
};

export default SidebarFile;
