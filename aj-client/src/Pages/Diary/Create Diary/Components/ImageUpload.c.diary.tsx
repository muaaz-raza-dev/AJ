import { IoMdAdd } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IdiaryCreate } from "@/app/Types/IdiaryCreate";
export default function ImageUpload() {
  const {setValue,watch} =useFormContext<IdiaryCreate>()
  const imagesG = watch("images")
  const [err, setErr] = useState("");
  const [imgSamples,setImgSamples] = useState<string[]>([])
 
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 1024 * 1024 * 10,
    multiple: true,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    onDrop(acceptedFiles, fileRejections) {
      if (fileRejections.length == 0) {
        setImgSamples(img=>img.concat(acceptedFiles.map(f=>URL.createObjectURL(f))))
        setValue("images",imagesG.concat(acceptedFiles))
        setErr("");
      } else {
        setErr(fileRejections[0].errors[0].message);
      }
    },
  });

 const cancelImage= (id:number)=>{
    setImgSamples(img=>(img.filter((_,i)=>i!=id)))
    setValue("images",imagesG.filter((_,i)=>id!=i))
 }



  useEffect(() => {
    if(!imagesG.length){
      setImgSamples([])
    }
    else {
      const isUploaded = imagesG.every(img=> typeof img =="string") 
      if(isUploaded){
        setImgSamples(imagesG as string[])
        setErr("")
      }
    }
   }, [imagesG])

  return (
    <section className="w-full px-2 max-lg:w-full flex flex-col gap-y-2">
      <h1 className="hFont font-semibold text-lg">Upload Images</h1>
      <div className={`lg:w-full rounded flex-wrap  flex gap-2`}>
        {
          imgSamples.map((img,id)=>{
          return <div className="relative" key={img}>
          <button type="button" onClick={()=>cancelImage(id)} className="bg-danger text-white rounded-full aspect-square p-1.5 shadow-sm absolute -right-1 -top-2">
            <ImCross size={10} />
          </button>
          <img
            src={img}
            alt={"photo"}
            className="object-cover h-24 w-24 rounded-md "
          />
        </div>
        })
      }
      <button 
      type="button"
      {...getRootProps()}
        className="w-24 h-24  rounded-md center border-2 bg-box text-gray-400"
        >
        <IoMdAdd size={28} />
      </button>
          </div>
        <input disabled {...getInputProps({ type: "file" })} />
      {err && <p className="text-sm text-red-600"> {err}</p>}
    </section>
  );
}
