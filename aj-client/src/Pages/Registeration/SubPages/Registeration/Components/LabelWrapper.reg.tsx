import { FC, ReactNode } from "react"
export interface Ichildren {
    children:ReactNode
    className?:string
}
interface ILabelWrapper extends Ichildren{
    title:string
}
const RegLabelWrapper:FC<ILabelWrapper> = ({children,className,title}) => {
  return (
    <div className={`flex flex-col gap-y-2 ${className}`}>
      <h1 className="DarkText hFont font-bold">{title} *</h1>
      {children}
    </div>
  )
}

export default RegLabelWrapper
