import { useAppSelector } from "@/app/ReduxHooks";
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess";
import moment from "moment";
import { BsBoxes } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
const Class_Header_Props = () => {
  let { Students, sections, Session, start_date ,_id } = useAppSelector(
    (s) => s.classDetailed.payload
  );
  return (
    <>
      <div className="flex flex-wrap gap-1 w-[95%] items-center">
        <div className="w-[25%] max-md:w-[30%]">
          <div className="">
            <ul className="flex gap-2 items-center">
              <li className=" w-10  h-10 aspect-square   bg-dark text-white p-2 center rounded-full">
                <FaUsers size={"30"} />
              </li>
              <li className="">
                <h3 className="hFont font-medium whitespace-nowrap  ">
                  {Students.length} students
                </h3>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[25%]  max-md:w-[30%]">
          <div className="">
            <ul className="flex gap-2 items-center">
              <li className="w-10 h-10 aspect-square center  bg-dark text-white p-2 rounded-full">
                <BsBoxes size={"30"} />
              </li>
              <li className="">
                <h3 className="hFont font-medium whitespace-nowrap  ">
                  {sections.length} section
                </h3>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:min-w-[48%] max-md:w-[35%]  flex max-md:flex-col gap-4 justify-end">
          <Link
            to={"/sessions/"}
            className=" border-darker border-2 dark:text-white  h-max rounded font-bold hFont px-3 py-1 w-max"
          >
            {Session?.acedmic_year}
          </Link>
          {
            <RoleBasedAccess roleToGiveAccess={"chief admin"}>
  <Link to={`/dashboard/class/edit/${_id}`} className="bg-darker h-9 center max-md:hidden whitespace-nowrap active:scale-95 transition-transform text-white  rounded font-bold hFont px-3 py-1 w-max">
  Update Class Details
  </Link>
            </RoleBasedAccess>
          }
        </div>
      </div>

      <div className=" w-[95%] flex gap-1 flex-wrap">
        <div className="w-[32%] font-bold">
          <p className="text-gray-600 text-sm dark:text-gray-300">Start Date</p>
          <p>{moment(start_date).format("D MMMM Y")}</p>
        </div>
        <div className="w-[32%] font-bold">
          <p className="text-gray-600 text-sm dark:text-gray-300">Session Name</p>
          <p>{Session?.session_name}</p>
        </div>
        
     
      </div>

      

 
        <Link to={`/dashboard/class/edit/${_id}`} className="bg-darker md:hidden whitespace-nowrap active:scale-95 transition-transform text-white h-max rounded-md font-bold hFont  py-2 text-center  w-full">
        Update Class Details
        </Link>

    </>
  );
};

export default Class_Header_Props;
