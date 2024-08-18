import { IaccountInfo } from "@/app/Types/IAccountInfo"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import useUploadMedia from "@/Hooks/Common/useUploadMedia"
import useResetPhoto from "@/Hooks/Settings/useUpdatePhoto"
import { Button } from "@/shdcn/components/ui/button"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"

const ProfilePhotoResetComp = () => {
    let {watch} =useFormContext<IaccountInfo>()
  let {upload,isLoading} =useUploadMedia()
  let {mutate,isLoading:loading} = useResetPhoto()
    let photo = watch("Info.photo")
 const [ImageState,setImageState] =useState<{file:File|null,sample:string,changes:boolean}>({file:null,sample:photo,changes:false})
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
        if(photo!=ImageState.sample) setImageState(e=>({...e,changes:true}))
    }, [ImageState.sample])
  useEffect(() => {
  photo && setImageState(e=>({...e,sample:photo}))
  }, [photo])
    const UploadFile = ()=>{
        if(ImageState.file) upload(OnImageUpload,ImageState.file,()=>{},"photo")
    }

      const OnImageUpload= ({success,photo}:{success:boolean,photo?:string})=>{
      if(success&&photo){
        mutate(photo)
        setImageState(e=>({...e,error:false,file:null,sample:photo ,changes:false})) 
      }
      else {toast.error("Error while uploading . Try again")}
      }
  return (
    <div className="flex items-center border-b border-gray-200 py-4  gap-1  w-full">
    <div className="w-[40%] flex flex-col gap-1">
    <h1 className="font-semibold dark:text-white leading-tight">Profile photo</h1>
    <p className="text-gray-500 text-sm leading-tight">Update your profile photo.</p>
    </div>
        <div className="min-w-[40%] flex  gap-4 justify-between items-center">
        <div  {...getRootProps({
          className:
           ` dropzone h-20 max-md:h-16 rounded-full aspect-square   border-2 center `,
        })}>
        <input {...getInputProps({ type: "image", })} />
        <img src={ImageState.sample||"/images/sample.png"} alt="" className="w-full shadow rounded-full h-full object-cover" />
            </div>
        <div className="flex gap-3 text-sm">
            <Button type="button"  onClick={()=>setImageState(e=>({...e,sample:"",file:null}))} className="text-danger hover:text-white hover:bg-danger bg-[var(--box)] shadow shadow-red-100 dark:shadow-none dark:bg-danger dark:text-white">Remove</Button>
            <Button onClick={UploadFile} disabled={!ImageState.changes} type="button" className="text-white bg-dark  hover:bg-dark hover:text-white transition-colors">{
            ImageState.changes? ( (isLoading||loading) ? <RequestLoading size="16" stroke="2" dark  /> : "Update"):"Update"}</Button>
        </div>
    </div>
    </div>
  )
}

export default ProfilePhotoResetComp