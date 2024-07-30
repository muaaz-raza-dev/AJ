import { FC } from "react";
import {  UseFormReturn } from "react-hook-form";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
formContext:UseFormReturn<any, any, undefined>,
field_name:string ,
required?:boolean
};
type CustomTextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  formContext:any
  field_name:string ,
  required?:boolean
};
const CustomInputs_Reg:FC<CustomInputProps> = ({ formContext,field_name,required,...props }) => {
  return (
    <input
    {...formContext.register(field_name,required?{required:"This field is required"}:{})}
    {...props}
    className=" dark:bg-darker dark:border-darker dark:text-white border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}

export const CustomTextArea_Reg:FC<CustomTextAreaProps> = ({formContext,field_name,required,...props}) => {
  return (
    <textarea
    {...formContext.register(field_name,required?{required:"This field is required"}:{})}
    {...props}
    className=" border rounded-md  w-full p-2 dark:bg-darker dark:border-darker dark:text-white  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}
export default CustomInputs_Reg