import { Button } from "@/shdcn/components/ui/button";
import {   Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import WebCamImage from "./WebCamImage.reg";
import clsx from "clsx";
import { Camera, Cross } from "lucide-react";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export interface IstdImageFile{
  Error:string,ImageFile:null|File,Preview:string;isCapture:boolean
}

const RegStdImage = () => {
  let {setValue,getValues,watch} = useFormContext()
  const [{Error,Preview,isCapture}, setFileState] = useState<IstdImageFile>({Error:"",ImageFile:null,Preview:getValues("photo"),isCapture:false})
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
    <section className="w-[18%] px-2 max-lg:w-full flex flex-col gap-y-2 ">
      <h1 className="DarkText dark:text-white hFont font-bold">Photo*</h1>
      <WebCamImage setFileState={setFileState} isCapture={isCapture}/>  {/* //! To access the image from webcam  */}
      <div
        {...getRootProps({
          className:
           ` dropzone lg:w-full max-lg:w-[20%]  max-md:w-[25%] max-sm:w-[35%] bg-box aspect-square border-[var(--darker)] 
           border-dark bg-darker  rounded border-2 center `,
        })}
      >
        <input {...getInputProps({ type: "file", })} />
        {(Preview?
        <img src={Preview} alt=""  className="object-contain h-full w-full "/>:
        <p className="text-gray-200 px-2 text-[0.7rem] cursor-pointer text-center">
          {!isCapture ? 
        "  Drag and Drop or click to select the file" : "Capture to display the image. "
        }
        </p>)
        }
      </div>
      <b className="text-red-600 text-[0.7rem]">{Error}</b>
      <CaptureButton setFileState={setFileState} isCapture={isCapture}/>
      
    </section>
  );
};



const CaptureButton:FC<{setFileState:Dispatch<SetStateAction<IstdImageFile>>,isCapture:boolean}> = ({setFileState,isCapture})=>{
  const FalseCapture = ()=> setFileState(e=>({...e,isCapture:false}))
  const HandleCancelCapture = ()=> setFileState({Error:"",ImageFile:null,Preview:"",isCapture:false})

  if(!isCapture){

    return <>
<Button type="button" onClick={()=>setFileState(e=>({...e,isCapture:!e.isCapture}))} className={
  clsx(
    `bg-box border-2 font-bold border-dark flex gap-2 text-dark  hover:bg-box`
  
  )
}>
   <Camera/>  Capture Photo
</Button>
    </>
}
else {
  return <div className="flex gap-2 justify-center">
<button type="button" onClick={FalseCapture} className={
  clsx(
    ` h-max py-1 px-2 rounded-md bg-[var(--success)] font-bold  hover:saturate-150 transition-all`
  
  )
}>
   <FaCheck />
</button>
<button type="button" onClick={HandleCancelCapture} className={
  clsx(
    `bg-danger h-max py-1 px-2 rounded-md  font-bold hover:saturate-150 transition-all`
  
  )
}>
<MdCancel />
</button>
  </div>
}
}



export default RegStdImage;
