import { Select } from "antd"
import { FC } from "react"

const CustomSelect_Reg:FC<{data:string[],placeholder:string}> = ({data,placeholder}) => {
  return <Select
    showSearch
    placeholder={placeholder}
    className="w-full   h-full"
    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
    options={data.map(e=>({label:e,value:e}))}
  />
  
}

export default CustomSelect_Reg