import {   useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const RegStdImage = () => {
  let {setValue,getValues,watch} = useFormContext()
  const [{Error,Preview}, setFileState] = useState<{Error:string,ImageFile:null|File,Preview:string}>({Error:"",ImageFile:null,Preview:getValues("photo"),})
  let { getRootProps, getInputProps, } = useDropzone({
    maxSize: 1024 * 1024*10,
    multiple: false,
    accept:{'image/*':[".png",".jpg",".jpeg"]},
    onError(err) {console.log(err);},
    onDrop(acceptedFiles, fileRejections) {
      if(fileRejections.length!=0){setFileState((a)=>({...a,Error:fileRejections[0].errors[0].message}))}
      else{setFileState(a=>({...a,Error:"",isLoading:false,Preview:URL.createObjectURL(acceptedFiles[0]),ImageFile:acceptedFiles[0]}))
    setValue("photo",acceptedFiles[0])
    }
}});
let Photo = watch("photo")
  useEffect(() => {
    if(!(Photo instanceof File)) {
    setFileState(a=>({...a,Preview:Photo}))
  }
  
  }, [Photo])
  return (
    <section className="w-[16%] flex flex-col gap-y-2 px-1">
      <h1 className="DarkText dark:text-white hFont font-bold">Photo*</h1>
      <div
        {...getRootProps({
          className:
           ` dropzone w-full aspect-square border-[var(--darker)]   border-2 center `,
        })}
      >
        <input {...getInputProps({ type: "file", })} />
        {(Preview?
        <img src={Preview} alt=""  className="object-contain"/>:
        <p className="text-[var(--secondary)] px-2 text-[0.7rem] cursor-pointer text-center">
          Drag and Drop or click to select the file
        </p>)
        }
      </div>
      <b className="text-red-600 text-[0.7rem]">{Error}</b>
    </section>
  );
};

export default RegStdImage;
