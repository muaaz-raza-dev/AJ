import { Button } from "@/shdcn/components/ui/button"
import CustomInputs_Reg from "../Helpers/CustomInputs_Reg.dash"
import LabelWrapper from "../Helpers/LabelWrapper.dash"
import { MdCancel } from "react-icons/md"

const Certification_Select = () => {
  return (
    <LabelWrapper required label="Certifications" className="w-full ">
        <section className="w-full flex gap-2 flex-col">
        <div className="flex gap-x-2 w-[50%]">
    <CustomInputs_Reg placeholder="Iot & Robotics" id="Certifications" className="" />
    <Button className="bg-dark text-white border border-dark hover:text-dark">Add</Button>
        </div>
        <div className=" w-[50%] rounded ">
            <div className="border-2 rounded-md border-dark text-dark w-max px-3 py-1 flex gap-2">
                <p>
                Iot Robotics
                </p>
                <button type="button" className="hover:scale-110 transition-all hover:text-red-500"><MdCancel/></button>
            </div>
        </div>
        </section>
  </LabelWrapper>
  )
}

export default Certification_Select