import { ItransactionField_Detailed } from "@/app/Types/ItransactionDetail"
import { TableCell, TableRow} from "@/shdcn/components/ui/table"
import { FC } from "react"
import { Link } from "react-router-dom"

const TableRowTrDetails:FC<{data:ItransactionField_Detailed}> = ({data}) => {
  return (
    <TableRow className="w-full dark:hover:bg-dark hover:bg-gray-200 font-medium ">
    <TableCell className="whitespace-nowrap min-w-[14.28%]">{data.paymentType}</TableCell>
    <TableCell className="whitespace-nowrap min-w-[14.28%]">
      <Link to={data.paymentTitle=="Registered"?`/payment-settings`:""}>
      {data.paymentTitle}
      </Link>
      </TableCell>
    <TableCell className="whitespace-nowrap min-w-[14.28%]">{data.month??""} {data.year??""} {(!data.month&&data.session)?data.session:"none"} </TableCell>
    <TableCell className="whitespace-nowrap min-w-[14.28%] ">{data.session??"none"}</TableCell>
    <TableCell className="whitespace-nowrap min-w-[14.28%]">{data.amount.realAmount} PKR</TableCell>
    <TableCell className="whitespace-nowrap text-red-700 min-w-[14.28%]">{data.amount?.discount} PKR</TableCell>
    <TableCell className="whitespace-nowrap font-bold min-w-[14.28%]">{data.amount.totalAmount} PKR</TableCell>
</TableRow>
  )
}

export default TableRowTrDetails