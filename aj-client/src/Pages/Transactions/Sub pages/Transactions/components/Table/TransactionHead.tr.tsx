import { TableHead, TableHeader, TableRow } from "@/shdcn/components/ui/table";

const TransactionHead = () => {
  return (
    <TableHeader className="dark:hover:bg-dark">
      <TableRow className=" dark:hover:bg-dark">
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
          Invoice
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
          Date
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
          GRNO
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
           Student Name
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
          Payors Name
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
          Recieved By
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-gray-600  dark:text-white hFont font-bold">
            Transaction Types
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-left text-gray-600  dark:text-white hFont font-bold">
           Total Amount
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TransactionHead;
