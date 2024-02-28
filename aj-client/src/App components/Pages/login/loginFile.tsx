import { Mail ,Lock} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
const LoginFile = () => {
  return (
    <div className="w-screen backdrop-blur-md h-screen bg-gradient-to-t center to-[var(--dark)] from-[var(--secondary)]">
      <div className="lg:w-[50%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-[95%] gap-y-8  GlassBackgroundLogin flex flex-col items-center p-12 rounded-md">
        <div className="w-32 text-white shadow-md aspect-square rounded-full center text-5xl font-black bg-[var(--dark)]"> AJ</div>
        <form className="md:w-[80%] max-md:w-[95%] flex flex-col justify-center gap-y-8">
        <div className="flex gap-x-3 items-center w-full border-b-2 border-black">
          <Mail className="text-gray-900"/> 
          <input placeholder="username or email "  className="bg-transparent  p-2 placeholder:text-gray-800 text-black font-medium  ring-0 outline-0 border-0 focus:outline-0 active:outline-0 focus-visible:ring-0"/>
        </div>
        <div className="flex items-center gap-x-3 border-b-2 border-black">
          <Lock className="text-gray-900"/> 
          <input placeholder="Password" type="password" className="bg-transparent p-2 placeholder:text-gray-800 text-black font-medium  ring-0 outline-0 border-0 focus:outline-0 active:outline-0 focus-visible:ring-0"/>
        </div>
        <div className="flex justify-between">
        <div className="flex items-center space-x-2">
      <Checkbox id="terms" className=" checked:ring-black" />
      <label
        htmlFor="terms"
        className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
      <Link href={"/"} className="font-bold text-sm">Forgot password?</Link>
        </div>
        <button className="bg-gradient-to-tr backdrop-blur-lg center to-[var(--dark)] from-[var(--dark)] w-full py-3 text-xl !rounded-lg text-white active:scale-95 transition-transform font-bold">
          Login
        </button>
        </form>
      </div>
    </div>
  )
}

export default LoginFile
