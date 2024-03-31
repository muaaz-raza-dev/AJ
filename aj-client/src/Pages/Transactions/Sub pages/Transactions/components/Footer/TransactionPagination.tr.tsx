import {  useAppSelector } from '@/app/ReduxHooks'
import useReadPageTransactions from '@/Hooks/Transactions/useReadPageTransactions'
import { useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { usePagination } from 'react-simpler'
const TransactionPagination = () => {
  let {Filters,DataLength}= useAppSelector(s=>s.transactions)
  let TrPerPage = import.meta.env.VITE_APP_TransactionPerRequest
  let {mutate} = useReadPageTransactions(Filters.count)
  let {hasNextPage,hasPreviousPage} = usePagination({itemsPerPage:TrPerPage,totalItems:DataLength})
  let HandlePagination = useCallback((direction:number)=>{
    let count = Filters.count+direction
   mutate({...Filters,count})
  },[Filters])
  return (
    <div className='flex gap-x-5 items-center'>
      <button disabled={!hasPreviousPage} className='text-[var(--dark)] center p-1.5 rounded-full 'onClick={()=>HandlePagination(-1)}>
      <FaChevronLeft size={18} /> <p className='text-xs'>Previous</p>
      </button>
      <button disabled={!hasNextPage} className='text-[var(--dark)] center p-1.5 rounded-full 'onClick={()=>HandlePagination(1)}>
      <p className='text-xs'>
         Next
        </p>
        <FaChevronRight size={18} />  </button>
    </div>
  )
}

export default TransactionPagination
