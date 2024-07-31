import useFetchConfigOverview from "@/Hooks/School Payment/useFetchConfigOverview"
import { Separator } from "@radix-ui/react-select"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

const PaymentStats = () => {
    let {data} =useFetchConfigOverview()
    let q = data?.stats
    if(data?.payload.feeFrequency !="One Time"){
        return (
            <section className="flex  bg-[var(--box)] dark:bg-darker dark:text-white rounded-md p-4  flex-col gap-2 w-full">
         <div className="flex justify-between pr-4">
    <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Payment Summary</h1>
    <Link to={""} className="bg-dark text-white hFont text-sm dark:bg-dark dark:text-white  center px-2 rounded font-medium flex gap-2">
        Detailed Report <ArrowUpRight size={18}/></Link>
    </div>
    <Separator  className='h-0.5 bg-gray-200 dark:bg-dark' />
    <section className='flex gap-2  w-full'>
        <div className="w-[24%] bg-gradient-to-br from-darker to-dark_dimmer text-white px-4 py-4 rounded-md">
            <p className='text-xs tracking-wider font-medium hFont'>Total Students</p>
            <h1 className='text-3xl font-medium'>  {q?.totalStudents} </h1>
        </div>
        {
            data?.payload.feeFrequency!="Yearly"&&
        <div className="w-[24%] bg-gradient-to-br from-darker to-dark_dimmer text-white px-4 py-4 rounded-md">
            <p className='text-xs tracking-wider font-medium hFont'>Average amount per month</p>
            <h1 className='text-3xl font-medium'>  {q?.TotalPerMonth} PKR</h1>
        </div>
        }
        <div className="w-[24%] bg-gradient-to-br from-darker to-dark_dimmer text-white px-4 py-4 rounded-md">
            <p className='text-xs tracking-wider font-medium hFont'>Average amount per year</p>
            <h1 className='text-3xl font-medium'>  {q?.TotalPerYear} PKR</h1>
        </div>
        <div className="w-[24%] bg-gradient-to-br from-darker to-dark_dimmer text-white px-4 py-4 rounded-md">
            <p className='text-xs tracking-wider font-medium hFont'>Average per year per student</p>
            <h1 className='text-3xl font-medium'>  {q?.AveragePerStudent} PKR </h1>
        </div>
        </section>
        </section>
)
}
}

export default PaymentStats