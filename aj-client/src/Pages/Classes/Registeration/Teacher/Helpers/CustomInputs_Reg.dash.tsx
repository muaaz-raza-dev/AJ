import { FC } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {

};
type CustomTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {

};
const CustomInputs_Reg:FC<CustomInputProps> = ({...props}) => {
  return (
    <input
    {...props}
    className=" border rounded-md  w-[95%] p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}

export const CustomTextArea_Reg:FC<CustomTextAreaProps> = ({...props}) => {
  return (
    <textarea
    {...props}
    className=" border rounded-md  w-[95%] p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}
export default CustomInputs_Reg