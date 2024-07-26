import { Avatar, Badge,  Space } from "antd";
import { FiSettings } from "react-icons/fi";
import { UserOutlined } from "@ant-design/icons";
import useHeaderLabel from "@/Hooks/Common/useHeaderLabel";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/ReduxHooks";
import useActiveRoute from "@/Hooks/Common/ActiveRoute";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/shdcn/components/ui/button";
const Header = () => {
  const { ActiveLabel } = useHeaderLabel();
  let { ValidateRoute } = useActiveRoute();
  let { Role, Name ,photo} = useAppSelector((s) => s.credits.Info);
  let Active = "!bg-dark !text-white dark:bg-light dark:text-dark";
  let navigate = useNavigate();
  return (
    <header className="w-full flex justify-between py-4">
      <div className="flex gap-x-2 items-center">
        <Button
          className="bg-dark hover:bg-dark  p-2 text-white"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft size={24} />
        </Button>
        <h1 className=" font-black text-3xl text-darker dark:text-white">
          {ActiveLabel}
        </h1>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="flex  items-center">
         <ThemeToggle/>

          <Link
            to={"/settings"}
            className="p-1 h-fit aspect-square px-2  center shadow-sm"
          >
            <button className={`
              rounded-md p-2 hover:bg-dark hover:!text-white text-dark bg-white dark:bg-dark dark:text-white transition-colors
              ${ValidateRoute({toCompare:"/settings",exact:false,classesToApply:Active})}`}>
            <FiSettings className=" group-hover:text-white " size={22} />
            </button>
          
          </Link>
        </div>
        <div className="flex gap-x-3 items-center">
          <div className="text-sm flex flex-col items-end">
            <h1 className="dark:text-white leading-tight  text-dark font-bold">{Name}</h1>
            <p className=" text-[0.87rem]  leading-tight dark:text-gray-400">{Role}</p>
          </div>
          <Link to={"/settings"} className="">
            <Badge>
              <Avatar
                size={36}
                shape="circle"
                icon={<UserOutlined />}
                src={photo||"/images/sample.png"}
                className=" border border-[var(--dark)] cursor-pointer shadow"
              />
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
