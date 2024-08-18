import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const useActiveRoute = () => {
  const {pathname} = useLocation()
  const [ActiveRoute, setActiveRoute] = useState(pathname);
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);
  const ValidateRoute = ({
    toCompare,
    index,
    classesToApply,
    exact=true
  }: {
    toCompare: string|string[];
    index?:boolean;
    classesToApply: string;
  exact?:boolean    
  }) => {
    const Route = pathname;
    const ifIndex = (Route == "/" || Route=="")? index ? classesToApply:"" : ""
    
    if(Array.isArray(toCompare)){
      return toCompare.includes(Route) ? classesToApply : ifIndex;
    }
    else {
      if (toCompare.includes("/")) {
        
        if (exact===false) {
          return Route.includes(toCompare) ? classesToApply : ifIndex;
        }
        else{
          return Route == toCompare ? classesToApply : ifIndex;
          }
          
          
        } else {
          Route.split("/").some((elm) => toCompare == elm) ? classesToApply :  ifIndex;
        }
      }
  };

  return { ValidateRoute, ActiveRoute };
};
export default useActiveRoute;
