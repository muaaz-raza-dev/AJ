import { useAppSelector } from '@/app/ReduxHooks'
import FilteredTransactions from '@/pdf/FilteredTransactions.pdf'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FiUploadCloud } from 'react-icons/fi'

const ExportTransaction = () => {
  const {Transactions} =useAppSelector(s=>s.transactions)
  const {DateRange} =useAppSelector(s=>s.transactions.Filters)
  return (
    <PDFDownloadLink
    document={<FilteredTransactions payload={{DateRangeDetails:DateRange,TotalTransactions:Transactions}} />}
    fileName="transaction_report.pdf"
    >
    <button
      className="h-8 rounded-md dark:text-white dark:bg-dark center aspect-square text-left bg-white text-dark  hover:bg-dark hover:text-white transition-colors active:scale-95   font-bold flex gap-2 "
    >
    <FiUploadCloud size={20} /> 
  </button>
      </PDFDownloadLink>
  )
}

export default ExportTransaction