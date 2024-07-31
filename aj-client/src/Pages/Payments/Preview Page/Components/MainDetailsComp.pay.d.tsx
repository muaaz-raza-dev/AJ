
import useFetchConfigOverview from '@/Hooks/School Payment/useFetchConfigOverview'
import { Separator } from '@/shdcn/components/ui/separator'
import { FC } from 'react'
const MainDetailsComp = () => {
  let {data} =useFetchConfigOverview()
  let q = data?.payload
    let details = {"Fee Title":q?.feeTitle,"Session":q?.session?.session_name+" "+q?.session?.acedmic_year, "Fee Description":q?.feeDescription,"Fee Status":q?.feeStatus, 
    "Fee Frequency":q?.feeFrequency, 
    }
  return (
      <section className="flex  bg-[var(--box)] dark:bg-darker dark:text-white rounded-md p-4  flex-col gap-3 w-full">
          <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Basic Details</h1>
          <Separator  className='h-0.5 dark:bg-dark bg-gray-200' />
          <div className="flex gap-2  max-md:gap-y-2  w-full flex-wrap">
            {
              Object.entries(details).map(([label, value]) => 
                {
                  if(value){
                  return  <EachDetailField key={label} label={label} value={value.toString()||""} />
                  }
                }
                )
            }
       </div>
      </section>
        )
}

const EachDetailField :FC<{label:string;value:string}> = ({label,value})=>{
    return <div className=" min-w-[49%] max-md:w-full   text-[1rem]">
    <p className="text-gray-500  text-[0.9rem] font-medium leading-tight">{label} </p>
    <p className=" font-semibold text-[0.9rem]   "> {value} </p>
</div>
}

export default MainDetailsComp