import useHeaderLabel from "@/Hooks/Common/useHeaderLabel";
import { FaAngleLeft } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/ReduxHooks";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/shdcn/components/ui/button";
import LogoutButton from "./LogoutButton";
import AvatarOptions from "./AvatarOptions";
const Header = () => {
  const { ActiveLabel } = useHeaderLabel();
  const { Role, Name } = useAppSelector((s) => s.credits.Info);
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-between py-4">
      <div className="flex gap-x-2 items-center">
        <Button
          className="bg-dark hover:bg-dark  p-2  h-max text-white"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft  className="max-md:!text-xl text-xl" />
        </Button>
        <h1 className=" font-bold text-3xl max-md:text-xl  text-darker dark:text-white">
          {ActiveLabel}
        </h1>
      </div>
      <div className="flex gap-x-2 items-center">
         <LogoutButton/>
        <div className="flex  items-center ">
         <ThemeToggle/>

          
        </div>
        <div className="flex gap-x-3 items-center">
          <div className="text-sm flex flex-col items-end max-md:hidden">
            <h1 className="dark:text-white leading-tight  text-dark font-bold">{Name}</h1>
            <p className=" text-[0.87rem]  leading-tight dark:text-gray-400">{Role}</p>
          </div>
         <AvatarOptions/>
        </div>
      </div>
    </header>
  );
};

export default Header;
