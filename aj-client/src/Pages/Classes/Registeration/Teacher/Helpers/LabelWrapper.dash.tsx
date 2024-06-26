import  { FC, ReactNode } from 'react'

const LabelWrapper:FC<{children:ReactNode,label:string,required?:boolean,className?:string}> = ({children,label,required,className}) => {
  return (
    <main className={` flex flex-col gap-y-2 w-[48%] ${className}`}>
        <label htmlFor={label} className='text-dark  font-medium'>{label} <span className='text-red-500'>{required&&"*"}</span></label>
        {children}
        </main>
  )
}

export default LabelWrapper