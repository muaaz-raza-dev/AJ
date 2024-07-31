import { Ipayment_config_short } from "@/app/Types/IpaymentLanding"
import { TableCell, TableRow } from "@/shdcn/components/ui/table"
import { Tooltip } from "antd"
import { ArrowUpRight } from "lucide-react"
import moment from "moment"
import { FC } from "react"
import { Link } from "react-router-dom"

const LP_EachConfigRowTable:FC<{data:Ipayment_config_short}> = ({data}) => {
  
  return (
    <TableRow className="dark:text-white">
              <TableCell className='text-dark dark:text-white font-bold text-base'>
    <Link to={`/payment-settings/${data?._id}`} className="flex items-center gap-1">
                {data.feeTitle} 
                <ArrowUpRight size={16}/>
              </Link>
                </TableCell>
              <TableCell className=' font-bold text-sm'>{data?.feeDescription}</TableCell>
              <TableCell className=' font-bold'>{data.feeFrequency}</TableCell>
              <TableCell className=' font-bold cursor-pointer'> 
                <Link to="/sessions">
                {data.session||"-"}
                </Link>
                </TableCell>
              <TableCell className=' font-bold  cursor-pointer'>
                <Tooltip title={data.feeStatus}>
                {data.feeStatus.split(" ")[0]}
                </Tooltip>
                </TableCell>
              <TableCell className=' font-bold'>{data.Installments||"-"}</TableCell>
                <TableCell className=' font-bold'>{moment(data.createdAt).format("D MMMM Y").toString()}</TableCell>
              <TableCell className='text-[var(--dark)] flex-wrap items-end ml-auto flex gap-1  font-bold'>
                { 
                data.classes ?
                data?.classes.map(e=>(
                  <Tooltip title={`${e.amount} PKR`} >
                <div className="rounded-full cursor-pointer  px-3 py-0.5 border border-dark bg-[var(--primary)] text-sm dark:bg-darker dark:text-white text-dark center">{e.name}</div>
                </Tooltip>
                  )
                ) :
                data?.feeAmount ||""
              }
              </TableCell>
    </TableRow>
  )
}

export default LP_EachConfigRowTable