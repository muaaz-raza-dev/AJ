import { Select } from "antd"
import { FC } from "react"

const CustomSelect_Reg:FC<{data:string[],placeholder:string,setState: (value: string) => void ,state:string}> = ({data,placeholder,state,setState}) => {
  return <Select
  showSearch
  value={state}
  onChange={setState}
  onSearch={setState}
  placeholder={placeholder}
  className="w-full h-full"
  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) }
  options={data.map(e=>({label:e,value:e}))}
  />
  
}

export default CustomSelect_Reg