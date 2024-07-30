import toast from "react-hot-toast";
import { EachKVBlock } from "./StudentDetailsKeyValuePairs.std.pf"
import { BsWhatsapp } from "react-icons/bs";
import { useAppSelector } from "@/app/ReduxHooks";
import { MdMail, MdPhone } from "react-icons/md";

const StudentContactDetails = () => {
  let {Student:{email,contact,WA}} =
  useAppSelector(s=>s.stdExclusive.overview)
  const CopytoClipboard = (text:string)=>{
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    });
  }
  return (
    <div className="flex gap-2  flex-wrap w-full px-4 py-4">
            <EachKVBlock label="Email" value={email}  onClick={CopytoClipboard}/>
            <EachKVBlock label="Cell phone 1" value={contact[0]}  onClick={CopytoClipboard}/>
            <EachKVBlock label="Cell phone 2" value={contact?.[1]}  onClick={CopytoClipboard}/>
            <EachKVBlock label="WhatsApp number" value={WA}  onClick={CopytoClipboard}/>
            <div className="w-[65%] max-md:w-full flex justify-end items-center gap-4">  
            <a href={`https://wa.me/+92${WA?.split("92")[1]||WA}`}  target="_blank" className="center text-dark bg-light 
            dark:bg-dark dark:text-white p-2 rounded-md">
              <BsWhatsapp  className="text-2xl max-md:text-xl"/>
            </a>
            <a href={`https://mail.google.com/mail/?view=cm&to=${email}`}  target="_blank" className="center 
            !text-dark dark:text-white bg-light dark:bg-dark p-2 rounded-md">
              <MdMail   className="text-2xl max-md:text-xl"/>
            </a>
            <a href={`tel:+92${contact[0]?.split("92")[1]||contact[0]}`}  target="_blank" className="center text-dark bg-light dark:bg-dark dark:text-white p-2 rounded-md">
              <MdPhone  className="text-2xl max-md:text-xl"/>
            </a>
            </div>
            </div>
  )
}

export default StudentContactDetails