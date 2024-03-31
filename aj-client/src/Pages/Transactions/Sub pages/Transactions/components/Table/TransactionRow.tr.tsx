import { IShortTransactions } from '@/app/Types/ItransactionsRead'
import { TableCell, TableRow } from '@/shdcn/components/ui/table'
import moment from 'moment'

const TransactionRow = ({data}:{data:IShortTransactions}) => {
  return (
    <TableRow>
              <TableCell className='text-[var(--dark)] font-bold'>#{data.Invoice}</TableCell>
              <TableCell className=' font-bold'>{moment(data.Time).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
              <TableCell className=' font-bold'>#{data?.Student?.GRNO}</TableCell>
              <TableCell className=' font-bold'>{data?.Student?.FirstName}</TableCell>
              <TableCell className=' font-bold'>{data?.RecievedBy?.Name}</TableCell>
              <TableCell className='text-[var(--dark)] items-end ml-auto  font-bold'>{data?.totalAmount} PKR</TableCell>
    </TableRow>
  )
}

export default TransactionRow
