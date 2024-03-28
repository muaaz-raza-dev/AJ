import { AspectRatio } from "@/shdcn/components/ui/aspect-ratio"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shdcn/components/ui/table"


const ImportedDataTable = () => {
  return (
    // <section className="w-full  bg-[var(--box)] shadow  center  relative py-4 rounded">
    //   <img src="/images/DataTable.png" className="h-[50vh]  object-contain bg-blend-darken opacity-70 aspect-square  top-0"/>
    //   <h2 className="hFont absolute text-4xl font-bold text-[var(--dark)]">your imported data will be displayed here</h2>
    // </section>
    <section className="w-full  bg-[var(--box)] shadow    relative py-4 rounded">
      <div className="w-full  px-4 text-base justify-between flex  items-center gap-x-6">
        <div className="flex gap-x-4 items-center">
        <p>Total students entered : <b className="DarkText">50</b></p>
        <p className="text-sm">No issue found</p>
        </div>
        <button className=" border-[var(--dark)] rounded-2xl text-[var(--dark)] hover:bg-[var(--dark)] justify-self-end border px-4 py-1 hover:text-white transition-colors duration-100 hFont"> Register all </button>
      </div>
    <Table >
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px] ">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>loret Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell className="text-right">$250.00</TableCell>
      </TableRow>
    
    </TableBody>
  </Table>
</section>  
  )
}

export default ImportedDataTable
