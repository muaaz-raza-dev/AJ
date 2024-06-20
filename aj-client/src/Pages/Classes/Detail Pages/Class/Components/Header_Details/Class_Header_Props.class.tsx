import schoolSubjects from "@/Pages/Classes/Landing/Components/Cards/Class/data/Subjects";
import { BsBoxes } from "react-icons/bs";
import { FaChalkboard, FaUsers } from "react-icons/fa";
const Class_Header_Props = () => {
  return (
    <>
      <div className="flex flex-wrap gap-1 w-[95%]">
        <div className="w-[28%]">
          <div className="">
            <ul className="flex gap-2 items-center">
              <li className=" w-10  h-10 aspect-square   bg-darker text-white p-2 center rounded-full">
                <FaUsers size={"30"} />
              </li>
              <li className="">
                <h3 className="hFont font-medium  ">25 students</h3>
                {/* <p className='hFont font-bold'>Students:</p> */}
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[28%]">
          <div className="">
            <ul className="flex gap-2 items-center">
              <li className="w-10 h-10 aspect-square center  bg-darker text-white p-2 rounded-full">
                <BsBoxes size={"30"} />
              </li>
              <li className="">
                <h3 className="hFont font-medium  ">2 section</h3>
                {/* <p className='hFont font-bold'>Students:</p> */}
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[28%]">
          <div className="">
            <ul className="flex gap-2 items-center">
              <li className="w-10 h-10 aspect-square center  bg-darker text-white p-2 rounded-full">
                <FaChalkboard size={"30"} />
              </li>
              <li className="">
                <h3 className="hFont font-medium  ">12 Active Teachers</h3>
                {/* <p className='hFont font-bold'>Students:</p> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 w-[95%]">
        <h1 className="hFont text-xl font-semibold">Subjects</h1>
        <div className="flex gap-1.5 flex-wrap">
          {schoolSubjects.map((e) => {
            return (
              <div className="w-max rounded-md  text-sm px-3 py-1 font-semibold border-2 hover:bg-dark_dimmer transition-colors border-[var(--dark)] text-darker">
                {e}
              </div>
            );
          })}
        </div>
      </div>

    </>
  )
}

export default Class_Header_Props