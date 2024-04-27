import { Label } from "@/shdcn/components/ui/label";
import { Input } from "@/shdcn/components/ui/input";
import { Card } from "@/shdcn/components/ui/card";
import { Button } from "antd";
import { useAppSelector } from "@/app/ReduxHooks";
const EditStudentForm = () => {
    let Details = useAppSelector(s=>s.stdExclusive.Information.Details)
    return (
        <Card>
          <div className=" flex w-full p-4">
            <div className="flex flex-wrap w-full gap-y-3">
                {Object.entries(Details).map(field=> {
                    return  <div key={`Student Information field: ${field[0]}`} className="grid gap-1.5 w-1/2">
                    <Label htmlFor={field[0]}>{field[0]}</Label>
                    <Input
                      className="w-[95%]"
                      id={field[0]}
                      placeholder={field[0]}
                      {...(typeof field[1]=="boolean")?{defaultChecked:field[1],type:'checkbox'}:{}}
                      defaultValue={field[1]||""}
                    />
                  </div>
                })}

            </div>
          </div>
          <StudentsInformationFormSumbit/>
        </Card>
      );
}

const StudentsInformationFormSumbit = () => (
    <div className="border-t border-gray-200 dark:border-gray-800 p-6 flex items-center justify-end gap-4">
      <Button  disabled className="hover:bg-[var(--dark)] bg-[var(--dark)] hover:text-white text-white hFont">Save</Button>
    </div>
  );
export default EditStudentForm