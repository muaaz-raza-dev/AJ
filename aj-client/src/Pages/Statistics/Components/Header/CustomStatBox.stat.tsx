import { Tooltip } from "antd";
import { FC } from "react"
import { Link } from "react-router-dom";

const CustomStatBox:FC<{svg:string;link?:string;label:string;mainValue:string,subLabel?:string;rate?:{Percentage:number;rate:("negative"|"positive"|"zero")},className:string}> = ({svg,label,mainValue,rate,subLabel,className,link}) => {
  
  let title = rate?.rate =="zero"  ? "No increments or decrements" : `The ${rate?.rate == "positive"?"increment":"decrement" } rate of the value compared to past`
  return (
    <div className={`flex justify-between  dark:text-white    overflow-hidden relative
     min-w-[24%] max-lg:w-[48%]  rounded-xl shadow  gap-2  h-32 max-md:h-28  ${className}`}>
    <div className="flex flex-col gap-1 w-full px-6 py-4">
      {link?
      <Link to={link}>
        <p className="hFont cursor-pointer max-md:text-sm font-normal">{label}</p>
      </Link>:
      <p className="hFont max-md:text-sm font-normal">{label}</p>
}

        <h1 className="text-4xl max-md:text-2xl font-bold">{mainValue} </h1>
        {subLabel&&
        <div className="flex gap-2 text-sm max-md:text-xs font-medium items-center">
        <p >{subLabel}</p>
        <Tooltip title={title}>
        <div className={`bg-light ${rate?.rate =="negative"&& "text-red-400"} ${rate?.rate=="positive"&&"text-green-600"} 
            ${rate?.rate=="zero"&&"text-gray-700"} cursor-pointer  shadow text-xs h-max px-2 font-medium tracking-wide py-0.5 flex gap-1 rounded items-center hFont`}>{rate?.Percentage} % </div>
            </Tooltip>
        </div>
            }
    </div>
    <img src={`/svgs/graph-${svg}.svg`} className="absolute right-0 -top-2  opacity-30 p-2" />
</div>
  )
}

export default CustomStatBox