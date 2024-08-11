import { FC, ReactNode } from "react"
export interface Ichildren {
    children:ReactNode
    className?:string
}
interface ILabelWrapper extends Ichildren{
    title:string
    required?:boolean
}
const RegLabelWrapper:FC<ILabelWrapper> = ({children,className,title,required}) => {
  return (
    <div className={`flex flex-col gap-y-2 max-md:w-full ${className}`}>
      <h1 className="DarkText dark:text-white hFont font-bold">{title} {required&&"*"}</h1>
      {children}
    </div>
  )
}

export default RegLabelWrapper
