import * as React from "react"
import { cn } from "@/shdcn/lib/utils"
import { Button } from "@/shdcn/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shdcn/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import moment from "moment"
const CustomDateSelector_Reg:React.FC<{className?:string;required?:boolean,formValue:string,label?:string,onChange:(value:string)=>void}> = ({className,formValue,label,onChange,required}) => {
    const [date, setDate] = React.useState<string>(formValue||"")
    React.useEffect(() => {
     date!=""&& onChange(moment(date).calendar("MMM"))
    }, [date])
    
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${className} justify-start text-left font-normal`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formValue ?  moment(formValue).format("D MMMM Y") : <span>{label||"Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
       <input type="date" required={required||false} value={!formValue?"":moment(formValue).format("YYYY-MM-DD")} onChange={(e)=>{setDate(e.target.value); 
       }}/>
      </PopoverContent>
    </Popover>
  )
}

export default CustomDateSelector_Reg