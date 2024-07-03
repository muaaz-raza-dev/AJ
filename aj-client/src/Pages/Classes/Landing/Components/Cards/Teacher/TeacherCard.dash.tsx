import { Iteacher } from "@/app/Types/ITeacherRegisteration";
import moment from "moment";
import { FC } from "react";
import Teaceher_CardLinks from "./Card/Teaceher_CardLinks.dash";

const TeacherCard:FC<{data:Iteacher}> = ({data}) => {
  return (
    <section className="rounded overflow-hidden shadow flex flex-col w-[40%]  h-max">
      <header className="h-[5rem] w-full ClassBG TeacherBg">
        <div className="bg-dark hover:bg-opacity-60 transition-colors rounded-md h-full w-full center  bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-10"></div>
      </header>
      <main className="bg-[var(--box)] rounded-md -mt-2 p-2 flex flex-col gap-1">
        <BasicDetails data = {data}/>
    
        <div className="flex justify-between mt-1">
          <div className="flex gap-1">

          <div className="flex gap-1 bg-[var(--info)]  text-[1rem] bg-darker text-white items-center  rounded px-2  ">
            <p>{data.acedmic_role}</p> {/* //! Role */}
          </div>
       
          <div className="flex gap-1 text-[1rem] bg-[#1EBA62] text-white items-center  rounded px-2  ">
            {moment(data.Date_Hire).fromNow()} worked {/* //! Expereience */}
          </div>
          <div className="flex gap-1 text-[1rem] bg-danger text-white items-center rounded px-2  ">

            {data.courses && data?.courses[0]}
          </div>
          </div>
          <div className="flex gap-2">
          <button className="border-dark border text-dark text-sm  px-3 py-1 rounded-md hover:bg-transparent font-bold hover:scale-95 transition-transform border-[var(--dark)] border transition-colors">
            Details
          </button>
          <button className="bg-dark text-sm text-white px-3 py-1 rounded-md  hover:scale-95 transition-transform border-[var(--dark)] border transition-colors flex gap-1 items-center">
            Edit
          </button>
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
          src={data.photo}
          alt="photo"
          className="w-full h-full rounded-full object-fill"
        />
      </div>
      <div className="">
        <h1 className="tracking-tight leading-none hFont font-semibold text-[1rem] ">
          {data.firstName} {data?.lastName}
        </h1>
        <p className=" text-[1rem] text-[#494949]">{data.qualification.Degree}</p>
        </div>
        </div>
     <Teaceher_CardLinks data={data}/>
    </div>
  );
}
export default TeacherCard;
