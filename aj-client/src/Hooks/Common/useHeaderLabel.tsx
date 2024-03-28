import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let RouteForLabel : {[key:string]:string} ={
    "/registeration":"Student Registeration",
    "/registeration/import":"Student Registeration",
    "/":"Home",
    "/students":"Student's Directory",
    "/transactions":"Transactions",
    "/transactions/create":"Create transaction"
}
const useHeaderLabel = () => {
    let {pathname} = useLocation()
    const [ActiveLabel, setActiveLabel] = useState<string>("Home");
    useEffect(() => {
setActiveLabel(RouteForLabel[pathname])
    }, [pathname]);
return {ActiveLabel}


}

export default useHeaderLabel
