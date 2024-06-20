import { Button } from "@/shdcn/components/ui/button"
import LabelWrapper from "../Helpers/LabelWrapper.dash"
import { useDropzone } from "react-dropzone";

const ProfilePicture_Upload = () => {
    let { getRootProps, getInputProps, } = useDropzone({
        maxSize: 1024 * 1024* 10,
        multiple: false,
        accept:{'image/*':[".png",".jpg",".jpeg"]},
        onError(err) {console.log(err);},
});
  return (
    <LabelWrapper required label="Profile Picture" className="">
        <div className="flex flex-col  gap-2">
            <div  {...getRootProps({
          className:
           ` dropzone w-[16%] rounded  aspect-square   border-2 center `,
        })}>
        <input {...getInputProps({ type: "file", })} />
        <img src="/images/sample.png" alt="" className="w-full rounded h-full object-cover"/>
            </div>
                <div className="flex gap-x-3">
                    <Button className="text-white bg-dark hover:text-dark border border-dark">Upload</Button>
                    <Button className="bg-[var(--box)] text-red-600 border border-red-600" >Remove</Button>
                </div>
        </div>

  </LabelWrapper>
  )
}

export default ProfilePicture_Upload