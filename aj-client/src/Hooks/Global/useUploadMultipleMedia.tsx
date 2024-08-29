import { UploadMultiplePhotosCloudinary } from "@/Api/Photo/PhotoUploadCloudinary.api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useUploadMultipleMedia() {
  const [isLoading,setLoading] = useState(false)
  const [isError,setError]=useState(false)
  async function upload(images:File[],cb:(images:string[])=>void){
    setLoading(true)
    UploadMultiplePhotosCloudinary(images).then(images=>{
        cb(images.map(img=>img.url))        
    }).catch(err=>{
        toast.error("an Error occured. Try again later.")
        console.log(err)
        setError(true)
    }).finally(()=>{
        setLoading(false)
    })    
}
return {upload,isLoading,isError}
}
