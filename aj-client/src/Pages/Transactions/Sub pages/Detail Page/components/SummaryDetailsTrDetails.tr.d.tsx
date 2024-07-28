import useFetchTransactionDetailed from '@/Hooks/Transactions/useFetchTransactionDetailed'
import { Separator } from '@radix-ui/react-select'
import moment from 'moment'
import { FC } from 'react'
const SummaryDetailsTrDetails = () => {
  let {data} = useFetchTransactionDetailed()
  let  q = data?.payload
  let details = {GRNO :q?.Student.GRNO , Student : q?.Student.FirstName+" " +q?.Student.LastName , Invoice :q?.Invoice, "Payors Name":q?.PayorsName ,"Recieved By":q?.RecievedBy.Name,"Paid Amount":q?.PaidAmount ,"Transaction Time":q?.isDelayedRegistory? moment(q?.Time).format("D MMMM Y "): moment(q?.Time).format("D MMMM Y hh:mm:ss a"),Registory : q?.isDelayedRegistory?"Delayed":"On Time"
    ,
    Note:q?.Note
  }
  return (
<section className="flex  bg-[var(--box)] dark:bg-darker dark:text-white rounded-md p-4  flex-col gap-3 w-full">
    <h1 className="text-3xl hFont font-bold text-darker dark:text-white">Summary</h1>
    <Separator  className='h-0.5 bg-gray-200' />
    <div className="flex gap-2 gap-y-5  w-full flex-wrap">
      {
        Object.entries(details).map(([label, value]) => 
          {
            if(value){
            return  <EachDetailField key={label} label={label} value={value.toString()||""} />
            }
          }
          )
      }
 </div>
</section>
  )
}
const EachDetailField :FC<{label:string;value:string}> = ({label,value})=>{
    return <div className="flex min-w-[49%] gap-3 text-[1rem]">
    <p className="text-gray-500 font-medium">{label} : </p>
    <p className=" font-semibold "> {value} </p>
</div>
}


export default SummaryDetailsTrDetails