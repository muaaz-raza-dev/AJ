import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
const TransactionPagination = () => {
  return (
    <div className='flex gap-x-5 items-center'>
      <button className='text-[var(--dark)] center p-1.5 rounded-full '>
      <FaChevronLeft size={18} /> <p className='text-xs'>Previous</p>
      </button>
      <button className='text-[var(--dark)] center p-1.5 rounded-full '>
      <p className='text-xs'>
         Next
        </p>
        <FaChevronRight size={18} />  </button>
    </div>
  )
}

export default TransactionPagination
