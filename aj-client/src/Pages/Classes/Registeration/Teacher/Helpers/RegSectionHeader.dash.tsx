import { Separator } from "@/shdcn/components/ui/separator"
import { FC, ReactNode } from "react"

const RegSectionHeader:FC<{children:ReactNode,label:string}> = ({children,label}) => {
  return (
<div className="flex w-full flex-col gap-2 bg-[var(--box)] shadow rounded-md">
                    <div className=" flex flex-col justify-between">
                        <h1 className="text-dark hFont py-4 text-xl font-bold px-4">{label}</h1>
                        <Separator />
                    </div>
        <div className="w-full flex flex-wrap gap-4 p-3">

{children}
</div>    
</div>    
  )
}

export default RegSectionHeader