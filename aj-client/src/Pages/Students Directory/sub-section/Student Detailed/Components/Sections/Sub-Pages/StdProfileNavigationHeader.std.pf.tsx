import { BsThreeDots } from "react-icons/bs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shdcn/components/ui/dropdown-menu"
import { FC } from "react"
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/ReduxHooks";


const StdProfileNavigationHeader:FC<{navigation?:boolean;title:string}> = ({title,navigation}) => {
  const {_id} =useAppSelector(s=>s.stdExclusive.overview.Student)
  return (
    <div className="w-full p-4 items-center flex gap-x-2 rounded-md bg-gradient-to-r text-md hFont from-[var(--darker)] to-[var(--dark)] text-white justify-between">
        <h1 className="text-lg hFont font-semibold ">{title}</h1>
          {navigation&&
        <DropdownMenu>
  <DropdownMenuTrigger className="hover:bg-white transition-colors duration-100 hover:text-dark px-3  rounded-md text-white">
          <BsThreeDots size={28}/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
    <Link to={"edit"}>
      Edit Info
    </Link>
      </DropdownMenuItem>
    <DropdownMenuItem>
    <Link to={`/students/history/${_id}`}>
      Fee & Class history
    </Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  }
    </div>
  )
}

export default StdProfileNavigationHeader