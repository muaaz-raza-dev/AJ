import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedDashFilters } from "@/app/Slices/DashboardSlice";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Menubar = () => {
  let { Sections } = useAppSelector((s) => s.dashboard.Filters);
  let location =useLocation()
  
  let dispatch = useAppDispatch();
  const SelectSection = (value: string) => {
    dispatch(RedDashFilters({ fields_name: "Sections", selected: value }));
    //Also run the fetch command to fetch another's type data
  };
  useEffect(() => {
    let route = location.pathname.split("/")[2]
    dispatch(RedDashFilters({ fields_name: "Sections", selected:(route =="classes" || !route)?"Classes":"Teachers" }));
  }, [])
  return (
    <div className="bg-[var(--box)] dark:bg-dark dark:border-darker p-2 text-black rounded-lg gap-3 flex w-1/2 max-md:w-full">
      {Sections.available.map((s) => {
        if (s == Sections.selected) {
          return (
            <Link to={`/dashboard/${s.toLowerCase()}`}
              className={` p-2 bg-[var(--dark)] w-1/2 center shadow-md dark:bg-darker  rounded-md text-white `}
              onClick={() => SelectSection(s)}
            >

                {s}
            </Link>
          );
        } else {
          return (
            <Link to={`/dashboard/${s.toLowerCase()}`}
              className=" center p-2 w-1/2 font-bold text-black dark:text-white rounded-md "
              onClick={() => SelectSection(s)}
            >
                {s}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Menubar;
