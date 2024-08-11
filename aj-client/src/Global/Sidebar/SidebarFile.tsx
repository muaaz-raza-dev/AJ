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
    <aside
    className={`${
      toggle ? "md:w-[20%]" : "md:w-[6%]"
    } fixed md:left-0 md:top-0 max-md:bottom-0  w-full max-md:min-h-20 max-[400px]:min-h-14 transition-all duration-150 md:h-screen bg-[var(--dark)]`}
  >
    <div className="w-full h-full  p-2 max-md:px-1 text-white flex flex-col max-md:flex-row items-center justify-between">
      <div className="w-full">
        <div className="flex gap-x-2 max-md:hidden py-8 items-center justify-center text-xl">
          <button
            onClick={Switcher}
            className="border border-[white] rounded-full bg-[var(--bg)] text-[var(--dark)] center aspect-square w-10 font-bold"
          >
            AJ
          </button>
          {toggle && <p>Foundation School</p>}
        </div>
        <SidebarLinks />
      </div>
      <SidebarAdminProfile />
    </div>
  </aside>
  
  );
};

export default SidebarFile;
