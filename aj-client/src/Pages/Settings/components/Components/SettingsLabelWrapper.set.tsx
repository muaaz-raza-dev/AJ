import  { FC, ReactNode } from 'react'

const SettingsLabelWrapper:FC<{description?:string,label:string , children?:ReactNode}> = ({label,description,children}) => {
  return (
    <div className="flex items-center border-b border-gray-200 py-4  gap-1  w-full">
    <div className="w-[40%] flex flex-col gap-1">
    <h1 className="font-semibold dark:text-white leading-tight">{label}</h1>
    {description&&
    <p className="text-gray-500 text-sm leading-tight">{description}</p>
    }
    </div>
    {children || null}
    </div>
  )
}

export default SettingsLabelWrapper