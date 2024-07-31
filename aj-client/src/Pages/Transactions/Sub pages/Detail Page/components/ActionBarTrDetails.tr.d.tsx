import useFetchTransactionDetailed from "@/Hooks/Transactions/useFetchTransactionDetailed"
import usePrintTransaction from "@/Hooks/Transactions/usePrintTransaction"
import Transaction from "@/pdf/Transaction.pdf"
import { Button } from "@/shdcn/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"

const ActionBarTrDetails = () => {
  let {data } = useFetchTransactionDetailed()
  let q = data?.payload
  const  {Print} =usePrintTransaction()
  return (
    <div className="md:p-2  rounded-md flex gap-4 md:justify-end " >
  
  <PDFDownloadLink document={<Transaction data={q}/>} fileName={`Reciept-${q?.Invoice}`}> 
           <Button className="bg-light dark:bg-darker hover:bg-dark text-dark dark:text-white hover:text-white border border-dark shadow  font-bold " >
            Download Transaction
        </Button>
  </PDFDownloadLink>
           <Button onClick={()=>Print(q)} className="bg-dark hover:bg-dark text-white shadow  font-bold " >
            Print Transaction
        </Button>
    </div>
  )
}

export default ActionBarTrDetails