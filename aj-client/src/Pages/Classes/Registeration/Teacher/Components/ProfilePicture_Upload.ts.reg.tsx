import { Button } from "@/shdcn/components/ui/button"
import LabelWrapper from "../Helpers/LabelWrapper.dash"
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUploadMedia from "@/Hooks/Common/useUploadMedia";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { useFormContext } from "react-hook-form";

const ProfilePicture_Upload = () => {
  const [loading,setLoading] =useState(false)
  let {upload} =useUploadMedia()
  let photo = useFormContext().watch("photo")
  const [ImageState,setImageState] =useState<{error:boolean,file:File|null,url:string,sample:string}>({error:false,file:null,url:photo,sample:""})
let { getRootProps, getInputProps, } = useDropzone({
        maxSize: 1024 * 1024* 10,
        multiple: false,
        accept:{'image/*':[".png",".jpg",".jpeg"]},
        onError() {setImageState(e=>({...e,error:true}))},
        onDrop(acceptedFiles) {
          if(acceptedFiles.length){
            let sample = URL.createObjectURL(acceptedFiles[0])
            setImageState(e=>({...e,file:acceptedFiles[0],sample}))
          }
    }
});
useEffect(() => {
      setImageState(a=>({...a,url:photo}))
}, [photo])
const Remove = () =>{
setImageState(e=>({...e,file:null,url:"",error:false,sample:""}))  
}
const UploadFile = ()=>{
  if(ImageState.file) upload(OnImageUpload,ImageState.file,setLoading,"photo")
}
const OnImageUpload= ({success,photo}:{success:boolean,photo?:string})=>{
if(success&&photo){toast.success("Profile photo is uploaded successfully 🙌") 
  setImageState(e=>({...e,error:false,url:photo,file:null,sample:""})) 
}
else{  setImageState(e=>({...e,file:null,url:"",error:true,sample:""}))  }
}

const AnalyzeDescription_Class = ()=>{
  let {error,url,sample} =ImageState
  if(error){
    return <p className="text-[0.9rem] text-red-600">Please upload a valid image.</p>
  }
  else{
    if(url) {
      return <p className="text-[0.9rem] text-green-600">The profile photo is uploaded.</p>
    }
    else {
      if(sample) {
        return <p className="text-[0.9rem] text-orange-600">The profile photo is not uploaded.</p>
            }
            else{
              return <p className="text-[0.9rem] text-dark">Select a photo .</p>
            }
    }
  }

}
  return (
    <LabelWrapper required label="Profile Picture" className="">
        <div className="flex flex-col  gap-2">
            <div  {...getRootProps({
          className:
           ` dropzone w-[16%] rounded  aspect-square   border-2 center `,
        })}>
        <input {...getInputProps({ type: "file", })} />
        <img src={photo||ImageState.sample||"/images/upload_image.png"} alt="" className="w-full rounded h-full object-cover" />
            </div>
            <AnalyzeDescription_Class/>
                <div className="flex gap-x-3">
                    <Button type="button" 
                    onClick={UploadFile}
                    disabled={!ImageState.file }
                     className="text-white bg-dark hover:text-dark border border-dark">
                     {loading?
                     <RequestLoading size="16" stroke="2" />
                     :"Upload"
                     }
                     </Button>
                    <Button type="button" onClick={Remove} disabled={!ImageState.file}
                     className="bg-[var(--box)] text-red-600 border border-red-600" >
                       {loading?
                     <RequestLoading size="16" stroke="2" dark  />
                     :"Remove"
                     }
                      </Button>
                </div>
        </div>

  </LabelWrapper>
  )
}

export default ProfilePicture_Upload