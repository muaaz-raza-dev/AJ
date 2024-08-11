import { useDeleteUserAccount } from "@/Hooks/User/useCreateUserAccount"
import { Tooltip } from "antd"
import { MdDelete } from "react-icons/md"
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
import { FC, useState } from "react"
import RequestLoading from "@/Global/Loaders/RequestLoding"
const DeleteUserCompont:FC<{id:string}> = ({id}) => {
    const [open, setopen] = useState(false)
    const {mutate:dlt,isLoading,isError} = useDeleteUserAccount(setopen)
  
  return (
    <AlertDialog open={open} onOpenChange={(val:boolean)=>val&&setopen(val)}> {/* //? the true value will be handled by-default  */}
    <AlertDialogTrigger>
    <Tooltip title={"Delete user permanantly."}>
    <button >
    <MdDelete size={22} className=' rounded-md  text-red-500' />
    </button>
    </Tooltip>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the user account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={()=>setopen(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={()=>dlt(id)} className="hover:bg-dark bg-dark text-white">
          {isLoading?<RequestLoading size="16" stroke="2"/>:isError?"Try Again later":"Continue"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteUserCompont