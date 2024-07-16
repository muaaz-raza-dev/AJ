import useFetchTransactionDetailed from '@/Hooks/Transactions/useFetchTransactionDetailed'
import { IoReceiptSharp } from 'react-icons/io5'
import ActionBarTrDetails from './ActionBarTrDetails.tr.d'

const HeaderTransactionDetail = () => {
  let {data  } = useFetchTransactionDetailed()
  let q =data?.payload 
  return (
      <div className="flex justify-between items-center bg-[var(--box)] p-2 rounded-md">
    <section className="flex flex-col justify-center gap-2 w-full">

    <div className="flex gap-2 items-center">
    <IoReceiptSharp  />
    <p>Invoice</p>
    </div>

    <div className="flex gap-3 items-end font-medium text-lg">
    <h1 className=" font-medium text-4xl">Inv-{q?.Invoice}</h1>
    <p>for</p>
    <p>{q?.amount?.totalAmount} Pkr</p>
    <button className={`${!q?.isCancelled?"bg-green-200":"bg-red-200 text-red-600"} text-base rounded-md px-4 py-0.5 `}>{q?.isCancelled ? "Cancelled":"Paid"}</button> 
    
    </div>
</section>
<ActionBarTrDetails />
      </div>
  )
}

export default HeaderTransactionDetail