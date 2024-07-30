import { FC, ReactNode } from "react"
const RegFormWrapper:FC<{children:ReactNode,title:string,className?:string}> = ({children,title,className}) => {
  return (
    <main className="w-full text-light  dark:bg-darker rounded-xl shadow-md ">
      <header className="bg-dark w-full dark:rounded-none rounded-t-xl ">
        <h1 className="text-white  hFont text-xl px-3 py-3 font-bold">
        {title}
        </h1>
      </header>
      <main className={`px-2 py-2 ${className}`}>
        {children}
      </main>
    </main>
  )
}

export default RegFormWrapper
