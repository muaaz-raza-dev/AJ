import { Popover, PopoverContent, PopoverTrigger } from "@/shdcn/components/ui/popover"
import { Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/app/ReduxHooks";
import { FaCog } from "react-icons/fa";
import { MdHelp } from "react-icons/md";

const AvatarOptions = () => {
  let {photo} = useAppSelector((s) => s.credits.Info);
  let {DarkMode} = useAppSelector(s=>s.global)
  let DarkClass = "bg-dark text-white hover:!bg-dark_dimmer";
  let LightClass = "bg-white text-dark";
  return (
    <Popover >
  <PopoverTrigger  >
            <Badge>
              <Avatar
                size={36}
                shape="circle"
                icon={<UserOutlined />}
                src={photo||"/images/sample.png"}
                className="  cursor-pointer shadow"
              />
            </Badge>


  </PopoverTrigger>
  <PopoverContent className={`w-[120px] border-darker  p-2 dark:!bg-dark dark:!text-white ${DarkMode?"bg-dark text-white":"!border-none"}`}>
  <div className="flex-col gap-1 flex w-full  ">
<Link to={"/settings"}  className={` ${DarkMode?DarkClass:LightClass}   text-start w-full hover:bg-gray-100   font-medium py-0.5 rounded-md  px-2 flex gap-2 items-center`}>
<FaCog/>
Settings</Link>
<Link  to={"/guide"}  className={` ${DarkMode?DarkClass:LightClass}  text-start w-full hover:bg-gray-100   font-medium py-0.5 rounded-md  px-2 flex gap-2 items-center `}>
<MdHelp />
Guide</Link>
  </div>

  </PopoverContent>
</Popover>
  )
}

export default AvatarOptions