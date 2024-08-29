import RequestLoading from "@/Global/Loaders/RequestLoding";
import { Button } from "@/shdcn/components/ui/button";
import { Send } from "lucide-react";

export default function SubmitDiary({isLoading}:{isLoading:boolean}) {
  return (
<Button disabled={isLoading} className="flex gap-2 bg-darker hover:bg-dark text-white hFont font-bold">
  {isLoading ?  <RequestLoading size="16" stroke="2"/>:"Send Diary"  }
<Send size={18}/>
</Button>      
  )
}
