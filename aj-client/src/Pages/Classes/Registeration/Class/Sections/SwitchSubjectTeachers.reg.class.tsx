import { Label } from "@/shdcn/components/ui/label"
import { Switch } from "@/shdcn/components/ui/switch"
import { FC } from "react"
import { useFormContext } from "react-hook-form"



const SwitchSubjectTeachers:FC<{index:number}> = ({index}) => {
    let form = useFormContext()
    let isSubTeacherDetails = form.watch(`sections[${index}].isSubTeacherDetails`)
  return (
    <div className="flex items-center space-x-2 dark:text-white">
      <Label htmlFor="airplane-mode">Subject Teacher Details</Label>
      <Switch id="airplane-mode" checked={isSubTeacherDetails} onCheckedChange={(val)=>form.setValue(`sections[${index}].isSubTeacherDetails`,val)} />
    </div>

  )
}

export default SwitchSubjectTeachers