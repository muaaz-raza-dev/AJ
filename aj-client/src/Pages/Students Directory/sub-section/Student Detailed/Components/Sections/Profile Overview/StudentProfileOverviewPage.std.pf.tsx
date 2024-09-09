import ErrorPage from "@/Global/Loaders/ErrorPage";
import { useAppSelector } from "@/app/ReduxHooks";
import useFetchStudentMeta from "@/Hooks/Read Student Exclusive/useFetchStudentMeta";
import NotFoundValidator from "@/Api/404Validator";
import StudentDetailedSkeletonLoader from "../../../StudentDetailedSkeletonLoader";
import StudentProfileOverviewSection from "./StudentProfileOverviewSection.std.pf";
import ProfileStdConfidentialInfoPage from "../Sub-Pages/ProfileStdConfidentialInfoPage.std.pf";
import StdAccountProfileDetails from "./StdAccountProfileDetails.std.pf";
const StudentProfileOverviewPage = () => {
  const { isLoading } = useAppSelector((s) => s.stdExclusive);
  const { isError, error } = useFetchStudentMeta();
  if (isError && NotFoundValidator(error))
    return (
      <ErrorPage
        title="Student not found"
        message="The student you're looking for is not exist"
        navigate="/students"
      />
    );
  if (isLoading) return <StudentDetailedSkeletonLoader />;
  return (
    <div className=" gap-y-2 flex flex-col mb-6 ">
      <div className="w-full  ">
        <StudentProfileOverviewSection />
        <StdAccountProfileDetails/>
      </div>
      <div className="w-full flex flex-col gap-2">
        <ProfileStdConfidentialInfoPage />
      </div>
    </div>
  );
};

export default StudentProfileOverviewPage;
