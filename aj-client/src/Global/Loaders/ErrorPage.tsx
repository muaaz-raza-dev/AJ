import { Link } from "react-router-dom"


const ErrorPage = ({navigate,message ,title}:{navigate?:string,message?:string;title?:string}) => {
   
  return (
    <div className="flex flex-col py-[18vh] justify-center items-center max-md:min-h-screen ">
      <div className="flex flex-col items-center p-10 rounded-lg  ">
        {/* Error Container */}
        <div className="flex flex-col items-center">
          <div className="text-red-600 font-bold text-9xl">
            404
          </div>
      
          <div className="font-bold text-4xl md:text-6xl text-center">
            {title || "Page not found"}
          </div>

          <div className="text-gray-600 font-medium text-base md:text-xl text-center mt-4">
            {message || "The page you are looking for could not be found or the link has crashed."}
          </div>
        </div>

        {/* Continue With */}
        <div className="flex flex-col items-center mt-12">
          <Link to={navigate || "/"} className="text-white px-6 py-3 rounded-md font-bold uppercase bg-dark ">
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage