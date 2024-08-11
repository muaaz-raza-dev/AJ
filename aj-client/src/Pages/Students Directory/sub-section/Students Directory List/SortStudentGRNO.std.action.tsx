// THis is very sensitive and intesive action

import { Tooltip } from "antd"
import { FaSortNumericDown } from "react-icons/fa"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shdcn/components/ui/alert-dialog"
import { useState } from "react"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import { useAppSelector } from "@/app/ReduxHooks"
import useSortStudentsGRNO from "@/Hooks/Settings/useSortStudentsGRNO"

const SortStudentGRNO = () => {
  const [open, setopen] = useState(false)
  const {sortGR} =useAppSelector(s=>s.global.AdvancedSettings)

  let {mutate,isLoading,isError} = useSortStudentsGRNO(setopen)
  const handleSortAction = ()=>{
    mutate()
  }

  if(!sortGR) return null
  return (
    <AlertDialog open={open} onOpenChange={(val:boolean)=>val&&setopen(val)}> {/* //? the true value will be handled by-default  */}
  <AlertDialogTrigger>
    <Tooltip title={"Sort student's GRNO based on admission date."}>
    <button className="h-12 max-md:w-full center rounded-md active:scale-95 bg-danger text-black font-bold px-4 gap-2">
       Sort Student
      <FaSortNumericDown size={22}/>
    </button>
    </Tooltip>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently change the GRNO
        and assigned each student based on admission date.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setopen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleSortAction} className="hover:bg-dark bg-dark text-white">
        {isLoading?<RequestLoading size="16" stroke="2"/>:isError?"Try Again later":"Continue"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default SortStudentGRNO