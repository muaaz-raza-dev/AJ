import { useAppSelector } from "@/app/ReduxHooks"
import { IclassPaymentDetails } from "@/app/Types/Iclass_detailed"
import { Badge } from "antd"
import { FC } from "react"
import { Link, useParams } from "react-router-dom"

const PaymentConfigDetails = () => {
  let id = useParams().id || ""
  let {isPaymentConfigUpdate,PaymentConfigDetails} =useAppSelector(s=>s.classDetailed.payload)
  return (
    <div className="w-full bg-[var(--box)] dark:bg-dark dark:text-white p-2 rounded-md" >
    <div className="flex justify-between px-2 my-2 ">

      <h1 className=" text-xl font-bold hFont">Payment Config Details</h1>
    <Badge dot={isPaymentConfigUpdate}>
      <Link to={`/dashboard/class/payment/${id}`} className="text-white bg-darker px-2 py-1 rounded font-medium text-sm">Update</Link>
    </Badge>
    </div>

    <div className="flex flex-wrap w-full gap-2">
      {
        PaymentConfigDetails.map(config=>{
return <EachPaymentConfigBlock data={config} />

        })
      }
    </div>
   
  </div>
  )
}

const EachPaymentConfigBlock:FC<{data:IclassPaymentDetails}> = ({data})=>{
  let id = useParams().id || ""
  return <div className="flex w-[49%] border-2  rounded-md hFont text-sm justify-between px-2 py-1">
      <Link to={`/payment-settings/${data._id}`} className="text-gray-600 dark:text-gray-200">{data.feeTitle}</Link>
      {data.class? 
      <b>{data.class.amount}</b> :
       <Link to={`/dashboard/class/payment/${id}`} className="bg-danger px-2 rounded text-white">update</Link> 
    }
  </div>
}

export default PaymentConfigDetails