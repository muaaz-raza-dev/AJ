import { FC } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
formContext:UseFormReturn<FieldValues, any, undefined>,
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
    {...formContext?.register(field_name,required?{required:"This field is required"}:{})}
    {...props}
    className=" border rounded-md  w-full p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}

export const CustomTextArea_Reg:FC<CustomTextAreaProps> = ({formContext,field_name,required,...props}) => {
  return (
    <textarea
    {...formContext?.register(field_name,required?{required:"This field is required"}:{})}
    {...props}
    className=" border rounded-md  w-[95%] p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}
export default CustomInputs_Reg