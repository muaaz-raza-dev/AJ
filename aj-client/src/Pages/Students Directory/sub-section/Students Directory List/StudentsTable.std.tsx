import {Table,TableBody,} from "@/shdcn/components/ui/table"
import StudentsTableHead from "./TableHead.std"
import StudentsTableRow from "./StudentsRow.std"
import StudentTableInformationFooter from "./TableInformationFooter.std"
import {  useAppSelector } from "@/app/ReduxHooks"
import RequestLoading from "@/Global/Loaders/RequestLoding"

  

const StudentsTable = () => {
  let {isLoading,MutableData,isNotFound}= useAppSelector(state=>state.StudentsDir)
  return (
    <>
    <Table className="bg-[var(--box)] dark:bg-dark dark:text-white rounded-lg shadow">
    <StudentsTableHead/>
    <TableBody>
      {MutableData?.map(data=><StudentsTableRow data={data}/>)}
    </TableBody>
  </Table>
    <div className="w-full">
      
      {isLoading?
      <div className="center">
      <RequestLoading dark  />
      </div>
      :
      (isNotFound||MutableData.length==0)&&
            <div className="center">
            no students found
            </div>
      
       }  
    <StudentTableInformationFooter/>
    </div>
    </>
  
  )
}

export default StudentsTable
