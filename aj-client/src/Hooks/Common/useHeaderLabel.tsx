import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let RouteForLabel: { [key: string]: string } = {
  "/students/*/edit": "Student Registeration",
  "/": "Students Directory",
  "/students": "Students Directory",
  "/transactions": "Transactions",
  "/transactions/create": "Create transaction",
  "/transactions/transaction/*": "Invoice details",
  "/students/*": "Student Profile",
  "/dashboard": "Classes & Teachers",
  "/dashboard/class/*" :" Class Overview",
  "/dashboard/teacher/register":"Staff Registeration",
  "/sessions" :"Yearly Session",
  "/sessions/edit/*" :"Update Session",
  "/sessions/registeration" : "Session Registeration",
  "/dashboard/class/edit/*" : "Update class details",
  "/dashboard/classes":"Classes",
  "/dashboard/teachers":"Teachers & Staffs",
  "/payment-settings" : "Payment Configurations",
  "/payment-settings/setup" : "Setup Payment Config",
  "/students/history/*" : "Classes and Fees history",
  "/settings" : "Personal Information ",
  "/settings/accounts" : "Accounts Settings ",
  "/settings/advanced" : "Advanced Settings ",
  "/stats" : "Acedmic Stats"
};
const useHeaderLabel = () => {
  let { pathname } = useLocation();
  const [ActiveLabel, setActiveLabel] = useState<string>("");
  let Validate = () => {
    let route_exists = RouteForLabel[pathname];
    if(route_exists) { setActiveLabel(route_exists) }
    else{
      
      let isRouteSelected = false;
      Object.keys(RouteForLabel).map((elm) => {
        if(!isRouteSelected){
          let Route_Stored = elm.split("/")
          let Route_Real = pathname.split("/")
          if(elm.includes("*") && Route_Stored.length == Route_Real.length){
            let Route_Flags :number[] = [] //to get the *th indexes
            Route_Stored.forEach((value,i)=>{ if(value=="*") Route_Flags.push(i)})
              Route_Stored.map((route,i)=>{ 
                if (!Route_Flags.includes(i)) {
                  if (route == Route_Real[i]) {
                        setActiveLabel(RouteForLabel[elm])
                        isRouteSelected =true
                      }
                      else isRouteSelected=false
                    }
                  })  
              }
            }
    

    });
}
};
useEffect(() => {
  Validate();
}, []);
  useEffect(() => {
    Validate();
  }, [pathname]);
  return { ActiveLabel  };
};

export default useHeaderLabel;
