import PhotoUploadCloudinary from '@/Api/Photo/PhotoUploadCloudinary.api';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

const useUploadMedia =() => {
    let Form = useFormContext()
    function upload (
        Cb: (state: any) => any,
media:File,
setLoading: React.Dispatch<React.SetStateAction<boolean>> ,
field_name?:string //to set the form value
    ){

        setLoading(true);
        PhotoUploadCloudinary(media)
        .then((res) => {
            Cb({success:true,photo:res.url});
            console.log(res.url);
            if(field_name) Form.setValue(field_name, res.url);
        })
        .catch((err) => {
            Cb({success:false,err});
            toast.error("Something went wrong try again later");
        }) .finally(()=>{
            setLoading(false);

        })
        
    }
    return {upload}
}

export default useUploadMedia