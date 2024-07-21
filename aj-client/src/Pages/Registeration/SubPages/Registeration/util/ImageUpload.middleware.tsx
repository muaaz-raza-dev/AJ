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
        Cb({ ...Form.getValues(), photo: res.url ,ConsiderOneTimeFee:Form.watch("NewAdmission") });
        Form.setValue("photo", res.url);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  } else {
    Cb({ ...Form.getValues(),ConsiderOneTimeFee:Form.watch("NewAdmission") });
  }
};

export default ImageUpload;
