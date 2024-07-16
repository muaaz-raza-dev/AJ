import { Select } from "antd"
import { FC } from "react"

const CustomSelect_Reg:FC<{className?:string,data?:string[],optimumData?:{value:string,label:string}[],placeholder?:string,setState: (value: string) => void ,state:string,nosearch?:boolean}> = ({data,placeholder,state,setState,nosearch,className,optimumData}) => {
  return <Select
  showSearch={nosearch?false:true}
  value={state}
  {... (nosearch&& { onChange:setState })}
  onSelect={setState}
  placeholder={placeholder}
  className={`w-full h-full ${className}`}
  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
  options={optimumData|| data?.map(e=>({label:e,value:e}))}
  />
  
}

export default CustomSelect_Reg