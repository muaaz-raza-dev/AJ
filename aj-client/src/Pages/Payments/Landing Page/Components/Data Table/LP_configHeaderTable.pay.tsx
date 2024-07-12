import { TableHead, TableHeader, TableRow } from '@/shdcn/components/ui/table'

const LP_configHeaderTable = () => {
  return (
    <TableHeader className="">
    <TableRow className=" ">
      <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
        Fee Title
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
        Fee description
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
        Fee Frequecy
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
          Session
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-left text-[var(--darker)] hFont font-bold">
          Fee Status 
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-left text-[var(--darker)] hFont font-bold">
          Installments
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
          Fee Scope
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">
            Created at
      </TableHead>
      <TableHead className="!h-[3.5rem] text-md text-left text-[var(--darker)] hFont font-bold">
          Amount
      </TableHead>
  
          </TableRow>
  </TableHeader>
  )
}

export default LP_configHeaderTable