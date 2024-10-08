import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteForLabel: { [key: string]: string } = {
  "/students/*/edit": "Edit Student Details",
  "/students/*": "Student Details",
  "/": "Students Directory",
  "/transactions/edit/*":"Edit Transaction Receipt",
  "/diary":"Student Daily Diary",
  "/diary/create":"Create new diary",
  "/diary/*":"Diary details",
  "/settings/user/edit/*" : "Edit user credentials",
  "/students": "Students Directory",
  "/stats/feereport":"Student Fee Report",
  "/transactions": "Transactions",
  "/settings/advanced-actions":"Advanced Settings",
  "/transactions/create": "Create transaction",
  "/transactions/transaction/*": "Invoice details",
  "/students/registeration": "Student Registeration",
  "/settings/users":"User Accounts Details",
  "/dashboard": "Classes & Teachers",
  "/dashboard/class/*" :" Class Overview",
  "/dashboard/class/payment/*" :"Class Based Payment Configs",
  "/dashboard/teacher/register":"Staff Registeration",
  "/sessions" :"Yearly Session",
  "/sessions/edit/*" :"Update Session",
  "/sessions/registeration" : "Session Registeration",
  "/dashboard/class/edit/*" : "Update class details",
  "/dashboard/classes":"Classes",
  "/stats/revenue":"Detailed Revenue Report",
  "/dashboard/staffs":"Staff Members",
  "/payment-settings" : "Payment Configurations",
  "/payment-settings/setup" : "Setup Payment Config",
  "/payment-settings/*" : "Payment Config Overview",
  "/students/history/*" : "Classes and Fees history",
  "/settings" : "Personal Information ",
  "/guide":"Workspace setup guideline",
  "/settings/accounts" : "Account Settings ",
  "/settings/users/new" : "Create new user account",
  "/settings/advanced" : "Advanced Settings ",
  "/stats" : "Acedmic Stats"
};

const useHeaderLabel = () => {
  const { pathname } = useLocation();
  const [ActiveLabel, setActiveLabel] = useState<string>("");
  const Validate = () => {
    const route_exists = RouteForLabel[pathname];
    if(route_exists) { setActiveLabel(route_exists) }
    else{
      
      let isRouteSelected = false;
      Object.keys(RouteForLabel).map((elm) => {
        if(!isRouteSelected){
          const Route_Stored = elm.split("/")
          const Route_Real = pathname.split("/")
          if(elm.includes("*") && Route_Stored.length == Route_Real.length){
            const Route_Flags :number[] = [] //to get the *th indexes
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
