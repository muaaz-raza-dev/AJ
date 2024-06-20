import { FC } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {

};

const CustomInputs_Reg:FC<CustomInputProps> = ({...props}) => {
  return (
    <input
    {...props}
    className=" border rounded-md  w-[95%] p-2  border-[#8080806b] focus:border-dark  transition-all outline-none "
    />
  )
}

export default CustomInputs_Reg