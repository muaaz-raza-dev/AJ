import { Dispatch, FC, SetStateAction, useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { IstdImageFile } from "./StdImage.reg";
import { Button } from "@/shdcn/components/ui/button";
import { useFormContext } from "react-hook-form";


const videoConstraints = {
    facingMode: "environment",
};

const WebCamImage:FC<{setFileState:Dispatch<SetStateAction<IstdImageFile>>,isCapture:boolean}> = ({setFileState,isCapture}) => {
    if(isCapture){
  let {setValue} = useFormContext()
const webcamRef = useRef<any>(null);

 
    const capture = useCallback(
      () => {
        if(webcamRef.current){
    const imageSrc = webcamRef.current.getScreenshot();
    let File = dataURLtoFile(imageSrc,`studentPhoto${Math.random().toString().slice(2,10)}`)
    setFileState(e=>({...e,ImageFile:File,Preview:imageSrc}))
    setValue("photo",File)
        }
      },
      [webcamRef]
    );
            

            
            return (
    <div className="flex flex-col gap-2">
       <Webcam
          audio={false}
          mirrored={true}
          className="rounded border-2 border-dark w-full aspect-square"
          ref={webcamRef}
          screenshotQuality={1}
          screenshotFormat="image/webp"
          videoConstraints={{...videoConstraints,aspectRatio:1/1,frameRate:175}}
          />
           <Button type="button" onClick={capture} className={
    `bg-dark border-2 font-bold border-dark text-white  hover:bg-dark`
  }>
  Capture 
</Button>
    </div>
  )
}
}


export function dataURLtoFile(dataurl: string, filename: string) {
   let arr = dataurl.split(",") 
   if(arr&&Array.isArray(arr)){
    let mime = arr[0].match(/:(.*?);/)?.[1] ;
       let bstr = atob(arr[arr.length - 1])
       let n = bstr.length
       let u8arr = new Uint8Array(n);
       while (n--) {
           u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    return null;
  }
export default WebCamImage