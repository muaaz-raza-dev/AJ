import useFetchStudentInformationExclusive from "@/Hooks/Read Student Exclusive/useFetchStudentsInformationExclusive";
// import EditStudentHeader from "./components/EditStudentHeader.std.pf";
// import EditStudentForm from "./EditStudentForm.std.pf";
import RegisterationFormFile from "@/Pages/Registeration/SubPages/Registeration/RegisterationFormFile.reg";
import StudentDetailedSkeletonLoader from "../../../StudentDetailedSkeletonLoader";
import NotFoundValidator from "@/Api/404Validator";
import ErrorPage from "@/Global/Loaders/ErrorPage";
const EditStdDetailsPage = () => {
  let {error,isLoading,isError}=  useFetchStudentInformationExclusive()
  if(isError&&NotFoundValidator(error))return <ErrorPage title="Student not found" message="The student you're looking for is not exist" navigate="/students"/>
if(isLoading) return <StudentDetailedSkeletonLoader/>
 
  return (
    <section className="bg-[var(--box)] rounded-md h-[40%] pb-6">
 <RegisterationFormFile edit={true}/>
    </section>
  );
};


export default EditStdDetailsPage;
