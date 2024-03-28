import { TableCell, TableRow } from '@/shdcn/components/ui/table'

const TransactionRow = () => {
  return (
    <TableRow>
              <TableCell className='text-[var(--dark)] font-bold'>#23423423</TableCell>
              <TableCell className=' font-bold'>23-3-24 : 4:15 PM </TableCell>
              <TableCell className=' font-bold'>#23434</TableCell>
              <TableCell className=' font-bold'>Muaaz</TableCell>
              <TableCell className=' font-bold'>Admission Fee</TableCell>
              <TableCell className='text-[var(--dark)]  font-bold'>45000 PKR</TableCell>
    </TableRow>
  )
}

export default TransactionRow
