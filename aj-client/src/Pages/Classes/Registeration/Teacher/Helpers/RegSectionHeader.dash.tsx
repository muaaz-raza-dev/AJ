import { Separator } from "@/shdcn/components/ui/separator"
import { Trash2 } from "lucide-react"
import { FC, ReactNode } from "react"

const RegSectionHeader:FC<{children:ReactNode,label:string,dark?:boolean,deleteBtn?:boolean , onDelete?:()=>void}> = ({children,label,dark,deleteBtn,onDelete}) => {
  return (
<div className="flex w-full flex-col gap-2 bg-[var(--box)]  dark:bg-dark shadow rounded-md">
                    <div className={` flex flex-col justify-between ${dark&&"bg-darker"} rounded-md` }>
                      <div className={`w-full rounded-md ${dark&&"bg-darker !text-white"} text-dark flex w-full justify-between`}>
                        <h1 className=" hFont py-4 dark:text-white text-xl font-bold px-4">{label}</h1>
                        {deleteBtn&&<button onClick={onDelete} className="text-red-400 rounded-md  py-1 px-4 hover:scale-105 transition-transform">
                          <Trash2/></button>}
                      </div>
                        <Separator className="dark:bg-darker" />
                    </div>
        <div className="w-full flex flex-wrap gap-4 p-3">
{children}
</div>    
</div>    
  )
}

export default RegSectionHeader