import { TableHead, TableHeader, TableRow } from "@/shdcn/components/ui/table";

const TransactionHead = () => {
  return (
    <TableHeader className="">
      <TableRow className=" ">
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
          Invoice
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
          Date
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
            GRNO
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
            Name
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
          Recieved By
        </TableHead>
        <TableHead className="!h-[3.5rem] text-md text-left text-[var(--darker)] hFont font-bold">
            Amount
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TransactionHead;
