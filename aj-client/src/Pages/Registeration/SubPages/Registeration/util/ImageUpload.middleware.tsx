import PhotoUploadCloudinary from "@/Api/Photo/PhotoUploadCloudinary.api";
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t";
import { UseFormReturn } from "react-hook-form";


const ImageUpload = (
  Cb: (state: any) => any,
  Form : UseFormReturn<IRegisterFormState, any, undefined>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let PhotoFile = Form.getValues("photo");
  if (PhotoFile instanceof File) {
    setLoading(true);
    PhotoUploadCloudinary(PhotoFile)
      .then((res) => {
        Cb({payload:{ ...Form.getValues(), photo: res.url }});
        Form.setValue("photo", res.url);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  } else {
    Cb({ ...Form.getValues() });
  }
};

export default ImageUpload;
