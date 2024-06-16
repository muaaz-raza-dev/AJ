import { FaChalkboardTeacher, FaUsers } from "react-icons/fa"

const ClassCard = () => {
  return (
    <div className="rounded overflow-hidden shadow flex flex-col w-[31%] h-max">
        <div className="h-[5rem] w-full ClassBG">
   <div className="bg-dark hover:bg-opacity-60 transition-colors rounded-md h-full w-full center  bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-0">
    <h1 className="text-4xl font-bold hFont">1st</h1>
</div>
    </div>
    <div className="px-2 py-3 flex flex-row items-center justify-between gap-1 bg-box">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center gap-x-1 ">
            <FaChalkboardTeacher size={"18"}/>
            <span className="ml-1 text-[0.8rem]">Laiba javed</span>
        </span>
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center gap-x-1 ">
            <FaUsers  size={"18"}/>
            <span className="ml-1 text-[0.8rem]">32 students</span>
        </span>
        
    </div>
</div>
  )
}

export default ClassCard