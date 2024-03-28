import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const useActiveRoute = () => {
  let {pathname} = useLocation()
  const [ActiveRoute, setActiveRoute] = useState(pathname);
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);
  const ValidateRoute = ({
    toCompare,
    classesToApply,
    exact=true
  }: {
    toCompare: string;
    classesToApply: string;
  exact?:boolean    
  }) => {
    let Route = pathname;
    if (toCompare.includes("/")) {
      if (exact===false) {
        return Route.includes(toCompare) ? classesToApply : "";
      }
      else{
        return Route == toCompare ? classesToApply : "";
      }
    } else {

      Route.split("/").some((elm) => toCompare == elm) ? classesToApply : "";
    }
  };

  return { ValidateRoute, ActiveRoute };
};
export default useActiveRoute;
