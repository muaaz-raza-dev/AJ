import useFetchClassDetaills from "@/Hooks/Teacher&Class/useFetchClassDetaills";
import Class_Header from "./Components/Header_Details/Class_Header.class";
import Schedule_Details from "./Components/Schedule_Details/Schedule_Details.class";
import Teacher_Details from "./Components/Teacher_Details/Teacher_Details.class";
import ErrorPage from "@/Global/Loaders/ErrorPage";
import StudentDetailedSkeletonLoader from "@/Pages/Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader";
import NotFoundValidator from "@/Api/404Validator";

const ClassDetailsPage = () => {
  let { isError, error, isLoading } = useFetchClassDetaills();
  if (isError && NotFoundValidator(error))
    return (
      <ErrorPage
        title="Class not found"
        message="The class you're looking for is not exist"
        navigate="/students"
      />
    );
  if (isLoading) return <StudentDetailedSkeletonLoader />;
  return (
    <div className="w-full flex max-md:flex-col  gap-2 ">
      <div className="flex w-[65%] max-md:w-full flex-col gap-4">
        <Class_Header />
        <Schedule_Details />
      </div>
      <Teacher_Details />
    </div>
  );
};

export default ClassDetailsPage;
