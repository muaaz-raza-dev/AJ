import { Iteacher } from "@/app/Types/ITeacherRegisteration";
import moment from "moment";
import { FC } from "react";
import Teaceher_CardLinks from "./Card/Teaceher_CardLinks.dash";
import { Link } from "react-router-dom";

const TeacherCard:FC<{data:Iteacher}> = ({data}) => {
  return (
    <section className="rounded overflow-hidden shadow flex flex-col w-[40%] max-md:w-full max-lg:w-[60%]  h-max">

      <main className="bg-[var(--box)] dark:bg-dark rounded-md -mt-2 p-2 py-4 flex flex-col gap-1">
        <BasicDetails data = {data}/>
    
        <div className="flex justify-between max-md:flex-col gap-2 max-md:items-end mt-1">
          <div className="flex max-md:self-start gap-1">

          <div className="flex gap-1   text-[1rem] border-2 dark:hover:bg-dark_dimmer cursor-default dark:text-white items-center  rounded px-2  ">
            <p>{data.acedmic_role}</p> {/* //! Role */}
          </div>
       
          <div className="flex gap-1 text-[1rem] border-2 dark:hover:bg-dark_dimmer cursor-default dark:text-white font-medium items-center  rounded px-2  ">
            {moment(data.Date_Hire).fromNow()} worked {/* //! Expereience */}
          </div>
          {data.qualification&&
          <div className="flex gap-1 text-[1rem] border-2 dark:hover:bg-dark_dimmer cursor-default dark:text-white font-medium items-center rounded px-2  ">
            {data.qualification.Degree}
          </div> }
          </div>
          <div className="flex gap-2">
          
          <Link to={`/dashboard/teacher/edit/${data?._id}`}>
          <button className="bg-dark dark:hover:bg-light dark:hover:text-dark font-semibold text-sm text-white px-4 py-1 rounded-md dark:bg-darker   border-[var(--dark)] border transition-colors flex gap-1 items-center">
            Edit
          </button>
          </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

const BasicDetails:FC<{data:Iteacher}> =({data}) =>{
  return (
    <div className="flex gap-3 items-center justify-between p-2">
      <div className="flex gap-3 items-center">

      <div className="w-12 h-12 rounded-full">
        <img
          src={data.photo||"/images/sample.png"}
          alt="photo"
          className="w-full h-full rounded-full object-fill"
        />
      </div>
      <div className="">
        <h1 className="tracking-tight leading-none hFont font-semibold text-[1rem] dark:text-white">
          {data.firstName} {data?.lastName}
        </h1>
        <p className=" text-[1rem] text-[#6e6e6e]">{data.qualification.Degree}</p>
        </div>
        </div>
     <Teaceher_CardLinks data={data}/>
    </div>
  );
}
export default TeacherCard;
