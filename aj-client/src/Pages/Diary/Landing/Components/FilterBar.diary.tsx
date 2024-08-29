import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash";
import { Label } from "@/shdcn/components/ui/label";
import { Input } from "antd";
export default function FilterBar() {
  return (
    <header className="flex gap-3 ">
    <div className="flex flex-col gap-2">
      <Label className="hFont">Select Yearly Session</Label>
      <CustomSelect_Reg
        state=""
        className="!min-w-[180px]"
        setState={() => {}}
        data={["2sr", "4fs"]}
        placeholder="Select Class"
      />
    </div>
    <div className="flex flex-col gap-2">
      <Label className="hFont">Select Class</Label>
      <CustomSelect_Reg
        state=""
        className="!min-w-[180px]"
        setState={() => {}}
        data={["2sr", "4fs"]}
        placeholder="Select Class"
      />
    </div>
    <div className="flex flex-col gap-2">
      <Label className="hFont">Select Section</Label>
      <CustomSelect_Reg
        state=""
        className="!min-w-[180px]"
        setState={() => {}}
        data={["2sr", "4fs"]}
        placeholder="Select Class"
      />
    </div>
    <div className="flex flex-col gap-2">
      <Label className="hFont">Pick Date </Label>
      <Input className="min-w-[180px]" type="date"/>
    </div>
  </header>
  )
}
