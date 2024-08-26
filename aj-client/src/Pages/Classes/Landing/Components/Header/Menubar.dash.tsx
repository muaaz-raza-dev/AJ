import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedDashFilters } from "@/app/Slices/DashboardSlice";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Menubar = () => {
  const { Sections } = useAppSelector((s) => s.dashboard.Filters);
  const location =useLocation()
  
  const dispatch = useAppDispatch();
  const SelectSection = (value: string) => {
    dispatch(RedDashFilters({ fields_name: "Sections", selected: value }));
    //Also run the fetch command to fetch another's type data
  };
  useEffect(() => {
    const route = location.pathname.split("/")[2]
    dispatch(RedDashFilters({ fields_name: "Sections", selected:(route =="classes" || !route)?"Classes":" Staffs" }));
  }, [])
  return (
    <div className="  dark:border-darker p-2 text-black rounded-lg gap-3 flex w-1/2  max-md:w-full">
      {Sections.available.map((s) => {
        if (s == Sections.selected) {
          return (
            <Link to={`/dashboard/${s.toLowerCase()}`}
              className={` p-2 bg-[var(--dark)] px-8 center shadow-md dark:bg-darker  rounded-md text-white `}
              onClick={() => SelectSection(s)}
            >

                {s}
            </Link>
          );
        } else {
          return (
            <Link to={`/dashboard/${s.toLowerCase()}`}
              className=" center p-2 px-8 font-bold text-black bg-gray-300 dark:bg-gray-900 dark:text-white rounded-md "
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
