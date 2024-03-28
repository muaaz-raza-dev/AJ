import { TableHead, TableHeader, TableRow } from '@/shdcn/components/ui/table'

const StudentsTableHead = () => {
  return (
    <TableHeader className=''>
      <TableRow className=' '>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">Name</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">GR</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">Father Name</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">Roll no</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">Date of admission</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-left text-[var(--darker)] hFont font-bold">Contact</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">Class</TableHead>
        <TableHead className="!h-[3.5rem] text-md text-[var(--darker)] hFont font-bold">Action</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default StudentsTableHead
