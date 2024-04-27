import { Link } from "react-router-dom"


const ErrorPage = ({navigate,message}:{navigate?:string,message?:string}) => {
   
  return (
    <div className="flex py-[18vh] justify-center max-md:min-h-screen ">
    <div className="flex flex-col">
        {/* <!-- Error Container --> */}
        <div className="flex flex-col items-center">
            <div className="text-[var(--dark)] font-bold text-7xl">
                404
            </div>
            <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
                { " Page not exsist"}
            </div>

            <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                {message ||"The page you are looking for could not be found."}
            </div>
        </div>

        {/* <!-- Continue With --> */}
        <div className="flex  mt-12 center">
            <Link to={navigate||"/"} className="text-white rounded-md w-max p-2 px-4 font-bold uppercase bg-[var(--dark)]">
                Go To Home
            </Link>

          
        </div>
    </div>
</div>
  )
}

export default ErrorPage