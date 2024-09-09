import RequestLoading from "@/Global/Loaders/RequestLoding";
import { useTrackChanges } from "@/Hooks/Common/useTrackChanges";
import useRequestEditDiary from "@/Hooks/Diary/useRequestEditDiary";
import { Button } from "@/shdcn/components/ui/button";
import { Send } from "lucide-react";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SubmitDiary({isLoading:loading,edit}:{isLoading:boolean;edit:boolean}) {
  
  return (
    <>
{
  edit ?
  <>
  <Link to={".."} className=" w-full ">
<Button type="button" disabled={loading} className="flex gap-2 w-full bg-danger hover:bg-danger text-white hFont font-bold">
Cancel
</Button>      
  </Link>
<EditSubmitButton loading={loading}/>
  </> : 
<Button disabled={loading} className="flex gap-2 bg-darker hover:bg-dark text-white hFont font-bold">
{loading ?  <RequestLoading size="16" stroke="2"/>: edit ?"Edit": "Send Diary"}
<Send size={14}/>
</Button>      
}
    </>
  )
}

const EditSubmitButton:FC<{loading:boolean}> = ({loading,}) =>{
  const {isLoading,isSuccess} = useRequestEditDiary(true)
  const {watch} = useFormContext()
  const payload = watch();
  const {changes,UpdateState} = useTrackChanges(payload)
  useEffect(() => {
    if(!isLoading&&isSuccess){UpdateState(watch())}
  }, [isLoading,isSuccess])
  return <Button disabled={!changes||loading} className="flex gap-2 bg-darker hover:bg-dark text-white hFont font-bold">
  {loading ?  <RequestLoading size="16" stroke="2"/>: "Edit"}
  <FaRegEdit size={16}/>
  </Button>      
}