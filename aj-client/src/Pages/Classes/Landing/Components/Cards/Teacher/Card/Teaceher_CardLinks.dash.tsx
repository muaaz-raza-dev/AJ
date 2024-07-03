import { Iteacher } from "@/app/Types/ITeacherRegisteration";
import { Mail } from "lucide-react";
import { FC } from "react";
import {   FaSquarePhone, FaWhatsapp } from "react-icons/fa6";

const Teaceher_CardLinks:FC<{data:Iteacher}> = ({data}) => {
  return (
    <div className="flex gap-2" >
    {data.email &&
  <a href={`https://mail.google.com/mail/?view=cm&to=${data?.email}`} target="_blank" className="p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square">
          <Mail  size={18}/>
      </a> }
      {
        data.phone &&
      <a href={`tel:+92${data.wa.includes("+92")?data.wa.split("+92")[1]:data.wa}`}target="_blank" className="p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square">
          <FaSquarePhone  size={18}/>
      </a>
      }
      {data.wa &&
        <a  href={`https://wa.me/+92${data.wa.includes("+92")?data.wa.split("+92")[1]:data.wa}`}  target="_blank" className="p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square">
          <FaWhatsapp  size={18}/>
      </a> }
  </div>
  )
}

export default Teaceher_CardLinks