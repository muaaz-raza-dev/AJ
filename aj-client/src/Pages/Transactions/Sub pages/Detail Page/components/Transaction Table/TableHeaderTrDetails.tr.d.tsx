import { TableHead, TableHeader, TableRow} from "@/shdcn/components/ui/table"

const TableHeaderTrDetails = () => {
  return (
    <TableHeader className="dark:hover:bg-transparent">
        <TableRow className=" dark:hover:bg-transparent">
            <TableHead className="">Payment Type</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Month - Year </TableHead>
            <TableHead className="">Yearly Session</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="">Discounts</TableHead>
            <TableHead className="">Total Amount</TableHead>
        </TableRow>
    </TableHeader>
 )
}

export default TableHeaderTrDetails