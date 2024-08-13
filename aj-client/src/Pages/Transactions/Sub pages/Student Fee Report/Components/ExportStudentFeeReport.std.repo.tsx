import { useAppSelector } from "@/app/ReduxHooks"
import StudentFeeReport from "@/pdf/StudentFeeReport.pdf"
import { Button } from "@/shdcn/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Tooltip } from "antd"
import { BiExport } from "react-icons/bi"

const ExportStudentFeeReport = () => {
  const {payload,isLoading,filters } =useAppSelector(s=>s.stdFeeReport)
  const {Sessions} =useAppSelector(s=>s.global)
    if(!isLoading){
      return (
  <Tooltip title="Export student list">
  <PDFDownloadLink
  document={<StudentFeeReport payload={payload} filters={filters} Sessions={Sessions}/>}
  fileName="studentFee_report.pdf"
  >
  <Button  className="flex items-center text-sm font-medium text-white transition-colors duration-150 bg-dark border border-transparent rounded-lg  hover:bg-darker focus:outline-none focus:bg-darker ">
  <BiExport size={24}/>
  </Button>
         </PDFDownloadLink>
    </Tooltip>
  )
}

}

export default ExportStudentFeeReport