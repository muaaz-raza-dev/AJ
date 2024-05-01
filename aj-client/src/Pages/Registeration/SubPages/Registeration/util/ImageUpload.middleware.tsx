import PhotoUploadCloudinary from "@/Api/Photo/PhotoUploadCloudinary.api"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"
import { UseFormReturn } from "react-hook-form"
import toast from "react-hot-toast"

const ImageUpload = (Cb:(state:IRegisterFormState)=>any,Form:UseFormReturn<IRegisterFormState, any, undefined>,setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    let PhotoFile = Form.getValues("photo")
    if(PhotoFile instanceof File){
        setLoading(true)
        PhotoUploadCloudinary(PhotoFile).then(res=>{
            Cb({...Form.getValues(),photo:res.url})
            console.log(res.url)
            Form.setValue("photo",res.url)
        }).catch(err=>{
            console.log(err)
            toast.error("Something went wrong try again later")
        }).finally(()=>setLoading(false))
    }
    else{
        
        Cb({...Form.getValues()})
    }
}

export default ImageUpload