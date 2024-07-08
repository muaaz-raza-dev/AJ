import useFetchClassDetaills from "@/Hooks/Teacher&Class/useFetchClassDetaills";
import Class_Header from "./Components/Header_Details/Class_Header.class";
import Schedule_Details from "./Components/Schedule_Details/Schedule_Details.class";
import Teacher_Details from "./Components/Teacher_Details/Teacher_Details.class";

const ClassDetailsPage = () => {
  useFetchClassDetaills()
  return (
    <div className="w-full flex  gap-2 ">
      <div className="flex w-[65%] flex-col gap-4">
        <Class_Header />
        <Schedule_Details/>
      </div>
      <Teacher_Details />
    </div>
  );
};

export default ClassDetailsPage;
