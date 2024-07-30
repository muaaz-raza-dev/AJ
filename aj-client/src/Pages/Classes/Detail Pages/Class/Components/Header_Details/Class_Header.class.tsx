import { useAppSelector } from "@/app/ReduxHooks";
import Class_Header_Props from "./Class_Header_Props.class";

const Class_Header = () => {
    let {name,} =useAppSelector(s=>s.classDetailed.payload)
  return (
    <div className="flex flex-col gap-y-4 w-full items-center bg-[var(--box)] pb-2">
      <div className="h-36 rounded-md pt-1 bg-dark w-full flex  justify-between">
        {/* Main Heading */}
        <div className="w-[30%] max-md:w-full  center">
          <h1 className="hFont text-white font-semibold text-4xl gap-4 flex max-md:text-6xl">{name}
            <p className="max-md:visible md:hidden"> Class</p>
          </h1>
        </div>
        {/* // Desing */}
        <div className="flex flex-row-reverse items-end mx-8 max-md:hidden">
          <div className="ml-[-150px]">
            <svg
              width="264"
              height="109"
              viewBox="0 0 264 109"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.0107422"
                y="0.6521"
                width="263.592"
                height="275.13"
                rx="20"
                fill="#FCC43E"
              />
            </svg>
          </div>
          <div className="user-svg-1">
            <svg
              width="264"
              height="59"
              viewBox="0 0 264 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.564056"
                width="263.592"
                height="275.13"
                rx="20"
                fill="#FB7D5B"
              />
            </svg>
          </div>
        </div>

      </div>
<Class_Header_Props/>
    </div>
  );
};

export default Class_Header;
