import { TableHead, TableHeader, TableRow} from "@/shdcn/components/ui/table"

const TableHeaderTrDetails = () => {
  return (
    <TableHeader className="dark:hover:bg-transparent">
        <TableRow className=" dark:hover:bg-transparent">
            <TableHead className="whitespace-nowrap">Payment Type</TableHead>
            <TableHead className="whitespace-nowrap">Title</TableHead>
            <TableHead className="whitespace-nowrap">Month - Year </TableHead>
            <TableHead className="whitespace-nowrap">Yearly Session</TableHead>
            <TableHead className="whitespace-nowrap">Amount</TableHead>
            <TableHead className="whitespace-nowrap">Discounts</TableHead>
            <TableHead className="whitespace-nowrap">Total Amount</TableHead>
        </TableRow>
    </TableHeader>
 )
}

export default TableHeaderTrDetails