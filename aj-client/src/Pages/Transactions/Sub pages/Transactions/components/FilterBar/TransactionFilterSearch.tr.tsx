import { IoSearch } from "react-icons/io5"
import {
    Select,
    SelectContent,

    SelectItem,

    SelectTrigger,
    SelectValue,
  } from "@/shdcn/components/ui/select"
const TransactionFilterSearch = () => {
  return (

         <div  className='flex  rounded-xl gap-x-1   items-center justify-center'>
      <div className="  bg-[var(--bg)] border-2 border-[var(--dark)]   flex gap-x-1 px-2 rounded-l-xl items-center">
      <IoSearch className='text-[var(--dark)]' size={21}/>
      <input className='px-2  py-3 bg-transparent placeholder-[var(--dark)] outline-none rounded-xl h-full ' placeholder='Search'  />
      </div>
      <Select  >
  <SelectTrigger className="w-[100px] h-full bg-transparent rounded-none focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-transparent ring-offset-0 ring-0 outline-none border-l-0 border-2 border-[var(--dark)] rounded-r-xl relative">
    <SelectValue placeholder="Invoice" defaultValue={"Invoice"} />
  <p className="absolute top-0 text-[0.6rem] text-[var(--dark)]  font-bold">Search Mode</p>
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Invoice">Invoice</SelectItem>
    <SelectItem value="GRNO">GR no</SelectItem>
  </SelectContent>
</Select>
 
      {/* <Input placeholder="Search" prefix={<FaSearch className="text-[var(--dark)]"/>}  className="w-[20%] px-2 focus:outline-none focus:shadow-none py-2 rounded-xl bg-[var(--box)] placeholder:text-[var(--dark)] text-black border-2 hover:border-[var(--dark)]
      focus-visible:border-[var(--dark)]   border-[var(--dark)] "/> */}
  
      </div>
  )
}

export default TransactionFilterSearch
