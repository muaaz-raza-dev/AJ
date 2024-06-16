import { FaChalkboardTeacher } from "react-icons/fa";

const TeacherCard = () => {
  return (
    <section className="rounded overflow-hidden shadow flex flex-col w-[47%]  h-max">
      <header className="h-[5rem] w-full ClassBG TeacherBg">
        <div className="bg-dark hover:bg-opacity-60 transition-colors rounded-md h-full w-full center  bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-10"></div>
      </header>
      <main className="bg-[var(--box)] rounded-md -mt-2 p-2 flex flex-col gap-1">
        <BasicDetails />
        <p className="tracking-tighter text-xs text-[#4d4d4d]">
          Lorem ipsum dolor sit amet, adipisicing elit. Ratione in{" "}
        </p>
        <div className="flex justify-between mt-1">
          <div className="flex gap-1 text-sm items-center">
            <FaChalkboardTeacher size={"16"} />
            <p>Receptionist</p> {/* //! Role */}
          </div>
          <button className="bg-dark text-sm text-white px-3 py-1 rounded-md hover:bg-transparent hover:text-black border-[var(--dark)] border transition-colors">
            Details
          </button>
        </div>
      </main>
    </section>
  );
};

function BasicDetails() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full">
        <img
          src="/images/sample.png"
          alt=""
          className="w-full h-full rounded-full object-fill"
        />
      </div>
      <div className="">
        <h1 className="tracking-tight leading-none hFont font-semibold text-[0.9rem] ">
          Andrina lobov
        </h1>
        <p className=" text-[0.85rem] text-[#494949]">Matric</p>
      </div>
    </div>
  );
}
export default TeacherCard;
