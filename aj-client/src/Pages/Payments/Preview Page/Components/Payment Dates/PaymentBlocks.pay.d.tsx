import useFetchConfigOverview from "@/Hooks/School Payment/useFetchConfigOverview"
import { FC } from "react"
import lod from "lodash"
import moment from "moment"
import { Separator } from "@/shdcn/components/ui/separator"


export function PaymentBlocks (){
    let {data} =useFetchConfigOverview()
    let q = data?.payload
    let months = lod.groupBy(q?.paymentMonths,({year})=>year)
    if(!q) return null
    if(q?.feeFrequency !="One Time" && q?.feeFrequency!= "Yearly"){
      return ( <>
      <div className="">
      <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Payment Dates Details</h1>
      <p className="text-gray-500 text-sm leading-tight">Months are listed with it's payment statuses </p>
        </div>
      <div className="flex gap-y-1 gap-x-1 flex-wrap w-full  ">
        { 
          q?.feeFrequency=="Monthly" && Object.entries(months)?.map((e,i) => {
            return <div className="flex flex-col gap-2 pb-2" key={`${e[0]} ${i}`}>
      <h1 className="text-xl hFont font-bold text-darker dark:text-white">{e[0]}</h1>
      <div className="flex gap-2 flex-wrap ">
      {
        e[1].map((m,i) => {
          return <MonthlyFeeComp key={i} data={m}/>
        })
      }
      </div>
            </div>
          })
        }
          <div >
          </div>
          </div>
      </>
          )
    }
    else if(q.feeFrequency=="Yearly") {
      return <><div className="">
      <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Payment Dates Details</h1>
      <p className="text-gray-500 text-sm leading-tight"> One Time in the session . </p>
        </div>
      <div className="flex gap-y-1 gap-x-1 flex-wrap w-full  "> 
      <YearlyFeeComp paymentDate={q?.paymentDate||""} dueDate={q.dueDate||""} isOneTime={false} />
      </div>
      </>
    }
    else {
      return <><div className="">
      <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Payment Dates Details</h1>
      <p className="text-gray-500 text-sm leading-tight"> One Time after admission or enrollment . It will be calculated based on year of admission accordingly </p>
        </div>
      <div className="flex gap-y-1 gap-x-1 flex-wrap w-full  "> 
      <YearlyFeeComp paymentDate={"On new admission"} isOneTime={true} />
      </div>
      </>
    }
  }



  function DateFormatter (date:string){
    return moment(date).format("DD MMMM YYYY")
  }
  
  export const MonthlyFeeComp:FC<{data:{
  year: string;
  month: string;
  isPayment: boolean;
  dueDate: string; // Required
  paymentDate: string; // Required
  }}> = ({data})=>{
  return<div  className="min-w-[24%] px-4 max-lg:w-[32%] border-2 border-dark  max-md:w-[49%] max-sm:w-full  p-2 bg-[var(--primary)]   text-dark dark:text-light dark:bg-darker rounded-md flex flex-col gap-1  h-max">
    
      <div className="flex gap-2 w-full justify-between ">
      <h1 className=" hFont font-semibold">{data.month} {data.year}</h1>
      
      <div className={` px-3 ${data.isPayment?"bg-dark":"bg-danger !text-black"} text-white cursor-pointer center text-sm font-semibold  rounded-full `}>
      <p>{data.isPayment?"Payment":"No payments"}</p>
      </div>
      </div>
      {data.isPayment?
    <div className="flex flex-col  text-xs text-gray-700 dark:text-gray-300  font-bold">
      <p className=""> Payment Date  : {DateFormatter(data.paymentDate)} </p>
      <p className=""> Due Date  : {DateFormatter(data.dueDate)} </p>
    </div> :null
    }
      </div>
  }
  
  
  export const YearlyFeeComp:FC<{paymentDate:string;dueDate?:string,isOneTime?:boolean}> = ({paymentDate,dueDate,isOneTime})=>{
      return <div  className=" border-2 border-dark     p-2 bg-[var(--primary)]   text-dark dark:text-light dark:bg-darker
       rounded-md flex flex-col gap-1">
          <div className="flex gap-2 w-full items-center ">
          <h1 className="text-sm hFont whitespace-nowrap font-semibold">{isOneTime?paymentDate:moment(paymentDate).format("DD MMMM YYYY")} </h1>
          {!isOneTime && <Separator className="h-1 w-8 rounded-md bg-dark"/>}
          <h1 className="text-sm hFont whitespace-nowrap font-semibold">
          {!isOneTime&&
          (dueDate?
            moment(dueDate).format("DD MMMM YYYY")
            :
            "Due date not provided")
          }
            </h1>
          
          </div>
          </div>
      }