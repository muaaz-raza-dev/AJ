import useFetchConfigOverview from "@/Hooks/School Payment/useFetchConfigOverview"
import { Separator } from "@/shdcn/components/ui/separator"
import { FC } from "react"
import { Link } from "react-router-dom"

const ClassesDetails = () => {
  let {data} =useFetchConfigOverview()
  let q = data?.payload
  return (
    <section className="flex  bg-[var(--box)] dark:bg-darker dark:text-white rounded-md p-4  flex-col gap-3 w-full">
    <div className="flex justify-between pr-4">
    <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Class Details</h1>
    <div className="bg-light text-dark hFont text-sm dark:bg-dark dark:text-white  center px-2 rounded font-medium">{q?.feeStatus}</div>
    </div>
    <Separator  className='h-0.5 bg-gray-200 dark:bg-dark' />
    <section className="flex gap-y-1 gap-x-1 flex-wrap w-full  py-2">
      {q?.classes.map(cl=> <EachClassBlock key={cl.classId.name} link={`/dashboard/class/${cl.classId._id}`} label={`${cl.classId.name.split("Class")[0]} Class `} value={`${cl.amount} PkR`} />)}
        </section>
    </section>
  )
}



export const EachClassBlock:FC<{label:string;value:string|any;link?:string;onClick?:(val:string)=>void}>  =({label,value,link,onClick})=>{
    if(value) {
    return <div onDoubleClick={()=>{onClick&&onClick(value)}} className="
     min-w-[24%] max-md:min-w-[48%] font-medium  border border-gray-200 rounded-md px-4 py-2 cursor-pointer shadow-sm transition duration-300 dark:border-dark hover:bg-gray-100 flex justify-between dark:hover:bg-dark">
    {link?
    <Link to={link} className="font-bold">{label}</Link>:
    <h2 className="text-gray-500  ">{label} :</h2>
}
    <h2 className="leading-tight dark:text-white ">{value}</h2>
</div>
}
}
export default ClassesDetails