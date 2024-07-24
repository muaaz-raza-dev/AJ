import { TableHead, TableHeader, TableRow } from '@/shdcn/components/ui/table'

const StudentsTableHead = () => {
  return (
    <TableHeader className=''>
      <TableRow className='' >
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Name</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">GR</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Father Name</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Roll no</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Date of admission</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-left text-[var(--darker)] dark:text-light hFont font-bold">Contact</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Current Class</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Current Section</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] dark:text-light hFont font-bold">Details</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default StudentsTableHead
