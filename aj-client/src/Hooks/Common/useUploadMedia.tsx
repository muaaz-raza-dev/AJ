import PhotoUploadCloudinary from '@/Api/Photo/PhotoUploadCloudinary.api';
import { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

const useUploadMedia =() => {
    let Form = useFormContext()
    const[isLoading,setIsLoading] =useState(false)
    function upload (
        Cb: (state: any) => any,
media:File,
setLoading: any,
field_name?:string //to set the form value
    ){
        setIsLoading(true)
        setLoading(true);
        PhotoUploadCloudinary(media)
        .then((res) => {
            Cb({success:true,photo:res.url});
            if(field_name) Form.setValue(field_name, res.url);
        })
        .catch((err) => {
            Cb({success:false,err});
            toast.error("Something went wrong try again later");
        }) .finally(()=>{
            setLoading(false);
            setIsLoading(false)
        })
        
    }
    return {upload,isLoading}
}

export default useUploadMedia