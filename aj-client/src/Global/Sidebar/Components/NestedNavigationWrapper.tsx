import { useAppSelector } from "@/app/ReduxHooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shdcn/components/ui/dropdown-menu";
import useScreenSizeTracker from "@/utils/useScreenSizeTracker";
import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

const NestedNavigationWrapper: FC<{
  children: ReactNode;
  labels: {
    label: string;
    url: string;
    icon?: ReactNode;
    roleToAccess?:( "admin" | "user" | "chief admin") | (( "admin" | "user" | "chief admin")[]);
  }[];

}> = ({ children, labels }) => {
  const {Role} =useAppSelector(s=>s.credits.Info)
  const [Toggle, setToggle] = useState(false);
  const size = useScreenSizeTracker();
  const EachLinkClass = `md:w-full  duration-50
   text-[var(--light)] rounded  transition-all   items-center 
    max-md:flex-col gap-y-1`;
  return (
    <DropdownMenu open={Toggle} onOpenChange={setToggle}>
      <DropdownMenuTrigger className={EachLinkClass}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={size == "md" || size == "sm" ? "top" : "right"}
        className="border-2 shadow"
      >
        {labels.map((lb) => {
          if(lb.roleToAccess ){
            if(Array.isArray(lb.roleToAccess) ){if(!lb.roleToAccess?.includes(Role)) return null}
            else if(lb.roleToAccess!=(Role)) return null
          }
       return  <>
            <DropdownMenuItem key={lb.label} onClick={() => setToggle(false)}>
              <Link
                to={lb.url}
                className="font-bold pr-4 py-1 flex gap-3 items-center"
                >
                {lb.icon}
                {lb.label}
              </Link>
            </DropdownMenuItem> 
              
          </>
      })}
      </DropdownMenuContent>
      </DropdownMenu>
  );
};

export default NestedNavigationWrapper;
