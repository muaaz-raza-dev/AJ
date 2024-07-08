import { Iclass } from "@/app/Types/Iclass";
import { Button } from "@/shdcn/components/ui/button";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

const ClassCard:FC<{data:Iclass}> = ({data}) => {
  return (
    <div className="rounded overflow-hidden bg-[var(--box)] shadow flex flex-col w-[30%] h-max pb-2 ">
      <Link to={`class/${data._id}`} className="h-[5rem] cursor-pointer w-full ClassBG relative">
      <div className="absolute bg-[var(--success)] top-2 hFont p-1 text-xs rounded-md font-bold left-2">{data.Session?.acedmic_year}</div>
        <div className="bg-dark hover:bg-opacity-60 transition-all rounded-md h-full w-full center  bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-80 ">
          <h1 className="text-4xl font-bold hFont">{data.name}</h1>
        </div>
      </Link>

      <div className="px-2 py-2  flex flex-col  justify-between gap-1 bg-box">
  
        <span className=" text-xs font-regular mr-1 flex flex-row items-center ">
        <span className=" text-[0.9rem] hFont font-bold text-dark">Duration :</span>
        <span className="ml-1 text-[0.9rem] "> {moment(data.start_date).format("D MMMM Y")} - {data.end_date?moment(data.start_date).format("D MMMM Y"):"Continue"}</span>
        </span>
        
      </div>
      <div className="justify-between flex items-center px-2">
        <div className="flex gap-1 justify-start">
      <div className="text-[0.8rem] font-semibold hFont !bg-[var(--warning)] p-1 px-3 rounded ">{data.sections.length} Sections</div>
      <div className="text-[0.8rem] font-semibold hFont !bg-[var(--info)] p-1 rounded px-3 ">{data.Students?.length} Students</div>
        </div>

      <div className="flex justify-end gap-2 ">
      <Link to={`class/edit/${data._id}`}>
        <Button className=" w-max p-1 h-max border-dark border text-dark hover:scale-95 transition px-2">Edit </Button>
        </Link>
        <Link to={`class/${data._id}`}>
        <Button className="bg-dark hover:bg-dark hover:text-white w-max p-1 h-max text-white hover:scale-95 transition px-2">Details</Button>
        </Link>
      </div>
      </div>

    </div>
  );
};

export default ClassCard;
