import { FC, ReactNode } from "react"
const RegFormWrapper:FC<{children:ReactNode,title:string,className?:string}> = ({children,title,className}) => {
  return (
    <main className="w-full boxColor rounded-xl shadow-md ">
      <header className="dark w-full rounded-t-xl">
        <h1 className="text-white  hFont text-xl px-3 py-2 font-bold">
        {title}
        </h1>
      </header>
      <main className={`px-3 py-2 ${className}`}>
        {children}
      </main>
    </main>
  )
}

export default RegFormWrapper
