import RequestLoading from "@/Global/Loaders/RequestLoding"
import useDeleteDiary from "@/Hooks/Diary/useDeleteDiary"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/shdcn/components/ui/alert-dialog"
import { Button } from "@/shdcn/components/ui/button"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"
  
export default function DiaryDeleteButton() {
    const [open,setOpen] = useState(false)
    const {mutate,isLoading} = useDeleteDiary()
    const handleDelete = () => {
        mutate()
    }
  return (
<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger className="w-max h-max">
  <Button variant={"destructive"} className="flex gap-2">
      <FaTrash /> Delete
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this diary
        and remove data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <Button onClick={handleDelete} className="bg-danger text-white hover:bg-danger active:scale-95 transition-transform">
    {
    isLoading? <RequestLoading size="12" dark stroke="2"/> : "Confirm"
    }
    </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
