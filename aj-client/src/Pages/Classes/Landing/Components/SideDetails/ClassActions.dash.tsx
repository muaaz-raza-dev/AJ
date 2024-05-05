import { Button } from "@/shdcn/components/ui/button"
import { Label } from "@/shdcn/components/ui/label"
import TextArea from "antd/es/input/TextArea"

const ClassActions = () => {
  return (
    <div className="">
        <div className=" flex flex-col  gap-1">
        <Label className="pt-2 hFont text-base font-bold">Quick Note</Label>
        <TextArea placeholder="Send a quick note to class" className="!resize-none placeholder:text-[var(--dark)]"/>
        <Button className="bg-dark text-white hover:bg-dark px-2"> 
        Send
        </Button>
        </div>
    </div>
  )
}

export default ClassActions