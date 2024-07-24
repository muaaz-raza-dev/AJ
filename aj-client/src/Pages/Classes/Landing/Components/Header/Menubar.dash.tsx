import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedDashFilters } from "@/app/Slices/DashboardSlice";
import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Menubar = () => {
  let { Sections } = useAppSelector((s) => s.dashboard.Filters);
  const [searchParams, setSearchParams] = useSearchParams()
  let section = searchParams.get("section") ||""
  let location =useLocation()
  useEffect(() => {
    dispatch(RedDashFilters({ fields_name: "Sections", selected: section }));
  }, [section])
  useEffect(() => {
setSearchParams(e=>({...e,section:Sections.selected}))  
  }, [location.pathname])
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
    <div className="  border-2 bg-[var(--box)] p-1 text-black rounded-lg gap-3 flex w-1/2">
      {Sections.available.map((s) => {
        if (s == Sections.selected) {
          return (
            <Link to={`/dashboard/${s.toLowerCase()}`}
              className={` p-2 bg-[var(--dark)] w-1/2 center shadow-md  rounded-md text-white `}
              onClick={() => SelectSection(s)}
            >

                {s}
            </Link>
          );
        } else {
          return (
            <Link to={`/dashboard/${s.toLowerCase()}`}
              className=" center p-2 w-1/2 font-bold text-black bg-[var(--box)] rounded-md "
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
