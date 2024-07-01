import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/shdcn/lib/utils"
import { Button } from "@/shdcn/components/ui/button"
import { Calendar } from "@/shdcn/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shdcn/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import moment from "moment"
const CustomDateSelector_Reg:React.FC<{className:string,label?:string}> = ({className,label}) => {
    const [date, setDate] = React.useState<Date>()
    let {setValue} = useFormContext()
    React.useEffect(() => {
      setValue("qualification.End_Date",moment(date).calendar("MMM"))
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
          {date ? format(date, "PPP") : <span>{label||"Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default CustomDateSelector_Reg