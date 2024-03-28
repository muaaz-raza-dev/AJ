import  { useDropzone } from "react-dropzone"

const RegStdImage = () => {
    let { getRootProps, getInputProps} =useDropzone()
  return (
   <section className="w-[16%] flex flex-col gap-y-2 px-1">
<h1 className="DarkText hFont font-bold">Photo*</h1>
      <div {...getRootProps({className: 'dropzone w-full aspect-square border-[var(--secondary)]  border-dashed border-2 center'})}   >
        <input  {...getInputProps({type:"file"})}/>
       <p className="text-[var(--secondary)] px-2 text-[0.7rem] cursor-pointer text-center">Drag and Drop or click to select the file</p>
      </div>
    </section>
  
  )
}

export default RegStdImage
