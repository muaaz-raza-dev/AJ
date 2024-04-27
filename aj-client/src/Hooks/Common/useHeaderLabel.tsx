import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let RouteForLabel : {[key:string]:string} ={
    "/registeration":"Student Registeration",
    "/registeration/import":"Student Registeration",
    "/":"Home",
    "/students":"Student's Directory",
    "/transactions":"Transactions",
    "/transactions/create":"Create transaction",
    "/students/*/*":"Student Profile",
    
}
const useHeaderLabel = () => {
    let {pathname} = useLocation()
    const [ActiveLabel, setActiveLabel] = useState<string>("Home");
   useEffect(() => {
    let settled  =false
        Object.keys(RouteForLabel).map(elm=>{
            let routeResult = RouteForLabel[pathname]
            if(settled ==false) {
                if (elm.includes('*')) {
                    let route = `${pathname.split('/').slice(0,pathname.split('/').length-1).join('/')}/*`
                    let routeResult = RouteForLabel[route]
                    let splittedPath  =pathname.split('/')
                    if(route.split('*')[0]==`${splittedPath.slice(0,splittedPath.length-1).join('/')}/`) { 
                        routeResult&&setActiveLabel(routeResult)
                        settled=true
                    }
                }
                else if(routeResult) {
                    settled=true
                    setActiveLabel(routeResult)
                }
            }
        })

    }, [pathname]);
return {ActiveLabel}


}

export default useHeaderLabel
