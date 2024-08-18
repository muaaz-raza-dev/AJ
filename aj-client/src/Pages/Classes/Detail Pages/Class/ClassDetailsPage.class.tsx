import useFetchClassDetaills from "@/Hooks/Teacher&Class/useFetchClassDetaills";
import Class_Header from "./Components/Header_Details/Class_Header.class";
import ErrorPage from "@/Global/Loaders/ErrorPage";
import StudentDetailedSkeletonLoader from "@/Pages/Students Directory/sub-section/Student Detailed/StudentDetailedSkeletonLoader";
import NotFoundValidator from "@/Api/404Validator";
import SessionDetails from "./Components/Schedule_Details/SessionDetails.class";
import RecentAdmissions from "./Components/Class&Payment Details/RecentAdmissions.class";
import PaymentConfigDetails from "./Components/Class&Payment Details/PaymentConfigDetails.class";
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess";

const ClassDetailsPage = () => {
  const { isError, error, isLoading } = useFetchClassDetaills();
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
        <SessionDetails/>
      </div>
      <div className='w-[35%] max-md:w-full flex flex-col max-md:flex-col-reverse gap-2 '>
        <RoleBasedAccess roleToGiveAccess={"chief admin"}>
      <PaymentConfigDetails/>
        </RoleBasedAccess>
      <RecentAdmissions />
    </div>
    </div>
  );
};


export default ClassDetailsPage;
