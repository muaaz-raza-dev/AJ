import { IShortTransactions } from '@/app/Types/ItransactionsRead'
import { TableCell, TableRow } from '@/shdcn/components/ui/table'
import { Tooltip } from 'antd'
import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const TransactionRow = ({data}:{data:IShortTransactions}) => {
  return (
    <TableRow className='hover:bg-gray-200 dark:hover:text-dark group transition-colors dark:text-white'>
<TableCell className='text-[var(--dark)] font-bold  '>
<div className="bg-darker text-white  w-8 h-8 font-bold center rounded-full aspect-square ">
{data.Invoice}
</div>
</TableCell>
<TableCell className=' font-bold cursor-pointer'>
<Tooltip title={data?.isDelayedRegistory? moment(data.Time).format('D MMMM Y ') : moment(data.Time).format('D MMMM Y hh:mm:ss a')}>
{moment(data.Time).format('D MMMM Y')}
</Tooltip>
</TableCell>
<TableCell className=' font-bold'>#{data?.Student?.GRNO}</TableCell>
<TableCell className=' font-bold'>{data?.Student?.FirstName}</TableCell>
<TableCell className=' font-bold'>{data?.PayorsName}</TableCell>
<TableCell className=' font-bold'>{data?.RecievedBy?.Name}</TableCell>
<TableCell className=' font-bold'>{data.Transactions.map(tr=>{
if(tr.paymentType == "Registered") {
return <Link to={"/payment-settings"} className='cursor-pointer bg-darker text-sm text-white rounded-xl font-bold w-max px-2 py-1'>{tr.paymentTitle}</Link>
}
else {
return <div className='cursor-pointer border-dark border text-sm text-dark  rounded-xl font-bold w-max px-2 py-1'>{tr.paymentTitle}</div>
}
})}</TableCell>
<TableCell className='text-[var(--dark)] dark:text-white dark:group-hover:text-black text-base items-end ml-auto  font-bold'>{data?.amount.totalAmount} PKR</TableCell>
<TableCell className='center'>
<Link to={`transaction/${data?._id}`} className="bg-darker hover:translate-x-0.5 transition-transform text-white rounded-md p-2 cursor-pointer">
<ArrowRight size={17} strokeWidth={"4"}/>
</Link>
</TableCell>
    </TableRow>
  )
}

export default TransactionRow
