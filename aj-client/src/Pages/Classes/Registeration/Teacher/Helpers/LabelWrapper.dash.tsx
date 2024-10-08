import  { FC, ReactNode } from 'react'

const  LabelWrapper:FC<{children:ReactNode,label:string,required?:boolean,className?:string , labelClassName?:string}> = ({children,label,required,className,labelClassName}) => {
  return (
    <main className={` flex flex-col gap-y-1 w-[48%] max-sm:w-full  ${className}`}>
        <label htmlFor={label} className={`text-dark  dark:text-white  font-semibold ${labelClassName}`}>{label} <span className='text-red-500'>{required&&"*"}</span></label>
        {children}
        </main>
  )
}

export default LabelWrapper