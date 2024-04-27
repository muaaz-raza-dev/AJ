import useFetchStudentInformationExclusive from "@/Hooks/Read Student Exclusive/useFetchStudentsInformationExclusive";
// import EditStudentHeader from "./components/EditStudentHeader.std.pf";
// import EditStudentForm from "./EditStudentForm.std.pf";
import RegisterationFormFile from "@/Pages/Registeration/SubPages/Registeration/RegisterationFormFile.reg";
const EditStdDetailsPage = () => {
  useFetchStudentInformationExclusive()
  return (
    <section className="bg-[var(--box)] rounded-md h-[40%] pb-6">
 {/* <EditStudentHeader/> */}
 <RegisterationFormFile edit={true}/>
      {/* <EditStudentForm /> */}
    </section>
  );
};


export default EditStdDetailsPage;
