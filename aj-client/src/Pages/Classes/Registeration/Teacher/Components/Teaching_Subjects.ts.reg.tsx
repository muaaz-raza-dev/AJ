import { Button } from "@/shdcn/components/ui/button"
import { schoolRoles } from "../Data/Roles"
import CustomSelect_Reg from "../Helpers/CustomSelect_Reg.dash"
import LabelWrapper from "../Helpers/LabelWrapper.dash"
import { MdCancel } from "react-icons/md"

const Teaching_Subjects = () => {
  return (
    <LabelWrapper required label="Teaching Subjects" >
        <section className="w-full flex gap-2 flex-col">
        <div className="flex gap-x-2 w-full">
    <CustomSelect_Reg data={schoolRoles} placeholder="Teaching Subjects"  />
    <Button className="bg-dark text-white border border-dark hover:text-dark">Add</Button>
        </div>
        <div className=" w-[50%] rounded ">
            <div className="border-2 rounded-md border-dark text-dark w-max px-3 py-1 flex gap-2">
                <p>
                Mathematics
                </p>
                <button type="button" className="hover:scale-110 transition-all hover:text-red-500"><MdCancel/></button>
            </div>
        </div>
        </section>
  </LabelWrapper>
  )
}

export default Teaching_Subjects