import { ItransactionField_Detailed } from "@/app/Types/ItransactionDetail"
import { TableCell, TableRow} from "@/shdcn/components/ui/table"
import { FC } from "react"
import { Link } from "react-router-dom"

const TableRowTrDetails:FC<{data:ItransactionField_Detailed}> = ({data}) => {

  return (
    <TableRow className="w-full hover:bg-gray-200 font-medium ">
    <TableCell className="w-[14.28%]">{data.paymentType}</TableCell>
    <TableCell className="w-[14.28%]">
      <Link to={data.paymentTitle=="Registered"?`/payment-settings`:""}>
      {data.paymentTitle}
      </Link>
      </TableCell>
    <TableCell className="w-[14.28%]">{data.month} {data.year} {!data.month&&data.session}</TableCell>
    <TableCell className="w-[14.28%]">{data?.session||"-"}</TableCell>
    <TableCell className="w-[14.28%]">{data.amount.realAmount}</TableCell>
    <TableCell className="w-[14.28%]">{data.amount?.discount}</TableCell>
    <TableCell className="w-[14.28%]">{data.amount.totalAmount}</TableCell>
</TableRow>
  )
}

export default TableRowTrDetails