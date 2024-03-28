import { useAppDispatch } from "@/app/ReduxHooks";
import { InsertToStudentsReg } from "@/app/Slices/StudentRegisterationSlice";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DnDStudentsImportArea = () => {
  let dispatch =useAppDispatch()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    dispatch (InsertToStudentsReg({SelectedFile:acceptedFiles[0]}))
  }, []);

  let { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });
  return (
    <section
      {...getRootProps()}
      className="w-full bg-[var(--box)] py-4 shadow-inner gap-y-2 cursor-pointer rounded-md border-[var(--dark)] border-2 border-dashed  flex flex-col center "
    >
      <input {...getInputProps({ type: "file" })} hidden />
      <img
        src="/images/excel.png"
        className="w-[10%] aspect-square mix-blend-multiply"
      />
      <p className="text-[var(--dark)] hFont">
        Drag or Select the .xlsx (excel) file to import the student's data
      </p>
      <button className="bg-[var(--dark)] text-white py-2 hFont w-[60%] rounded-lg ">
        Select from computer
      </button>
    </section>
  );
};

export default DnDStudentsImportArea;
