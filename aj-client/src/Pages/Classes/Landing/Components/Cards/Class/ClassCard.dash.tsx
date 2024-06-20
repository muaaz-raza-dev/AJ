import {FaUsers } from "react-icons/fa";
import RandomColors  from "./data/ColorCombos.class";
import { Link } from "react-router-dom";

const ClassCard = () => {
  return (
    <div className="rounded overflow-hidden bg-[var(--box)] shadow flex flex-col w-[21%] h-max ">
      <Link to="class/1" className="h-[5rem] cursor-pointer w-full ClassBG">
        <div className="bg-dark hover:bg-opacity-60 transition-all rounded-md h-full w-full center  bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-80 ">
          <h1 className="text-4xl font-bold hFont">1st</h1>
        </div>
      </Link>
      
      <div className="px-2 pt-2  flex flex-col  justify-between  bg-box">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 w-full justify-center flex flex-row items-center gap-x-1 ">
          <span className="ml-1 text-[0.9rem] hFont font-bold ">Andresson john</span>
        </span>
        <span className="py-1 text-xs font-regular text-[gray] mr-1 flex flex-row items-center gap-x-1 ">
          <FaUsers size={"18"} />
          <span className="ml-1 text-[0.8rem]">32 students</span>
        </span>
      </div>
      <div className="w-full py-1 pb-2 px-2">
        <div className=" w-[60%] flex gap-2">
          {["Math", "science", "Urdu"].map((e, i) => {
            return (
              <div
                className="w-max rounded-md font-light text-xs p-1  "
                style={{
                  backgroundColor: RandomColors[i%RandomColors.length]
                }}
              >
                {e}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
