import { Iclass } from "@/app/Types/Iclass";
import { Button } from "@/shdcn/components/ui/button";
import { Tooltip } from "antd";
import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

const ClassCard:FC<{data:Iclass}> = ({data}) => {
  return (
    <div className=" rounded-md  overflow-hidden bg-[var(--box)] border dark:border-darker dark:bg-darker dark:text-white shadow flex flex-col lg:w-[30%] max-md:w-full max-lg:w-[48%] h-max pb-2 ">
      <div className="min-h-[2rem] cursor-pointer w-full relative">
      <Link to={`/dashboard/class/${data._id}`}  >
      <div className="absolute bg-[var(--success)] text-black top-2 hFont p-1 px-2 text-xs rounded-md font-bold left-2">
        {data.Session?.acedmic_year}
      </div>
        <div className="bg-dark text-white center">
          <h1 className="text-4xl font-bold hFont p-3">{data.name}</h1>
        </div>
        </Link>
        {data.updates.paymentConfigs&&
        <Tooltip title={"Payment settings for this class is not configured."}>
        <Link to={`/dashboard/class/payment/${data._id}`}>
        <div className="absolute bg-danger text-black top-2 hFont p-1 px-2 text-xs rounded-md font-bold right-2">
           Setting Required</div>
        </Link>
        </Tooltip>

}
</div>

      <div className="px-3 py-2  flex flex-col  justify-between gap-1 bg-box dark:bg-transparent">
  
        <span className=" text-xs font-regular mr-1 flex flex-row items-center ">
        <span className=" text-[0.9rem] hFont font-bold text-dark dark:text-white">Duration :</span>
        <span className="ml-1 text-[0.9rem] "> {moment(data.start_date).format("D MMMM Y")} - {data.end_date?moment(data.start_date).format("D MMMM Y"):"Continue"}</span>
        </span>
        
      </div>
      <div className="justify-between flex items-center pb-2 px-3">
        <div className="flex gap-1 justify-start">
      <div className="text-[0.8rem] font-semibold hFont text-black dark:text-white dark:border-dark  border-2 p-1 px-3 rounded ">{data.sections.length} Sections</div>
      <div className="text-[0.8rem] font-semibold hFont text-black dark:text-white dark:border-dark  border-2 p-1 rounded px-3 ">{data.Students?.length} Students</div>
        </div>

      <div className="flex justify-end gap-2 ">
      <Link to={`/dashboard/class/edit/${data._id}`}>
        <Button className=" w-max p-1 px-4 h-max bg-dark text-white hover:bg-dark transition ">Edit </Button>
        </Link>
      </div>
      </div>

    </div>
  );
};

export default ClassCard;
