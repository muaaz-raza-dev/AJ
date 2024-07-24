import { useFormContext } from "react-hook-form"
import { Payment_Dates_Reg_Sections } from "../Payment_Dates_Reg_Sections.pay"
import DynamicCLass_Reg from "./DynamicCLass_Reg.pay"
import MonthsPay_Red from "./MonthsPay_Red.pay"

const DynamicSections_Reg = () => {
  let form =useFormContext()
  let feeFrequecy = form.watch("payload.feeFrequency");
    return (
        <div className={`w-[60%]  flex flex-col gap-4 rounded-lg transition-all `}>
          <DynamicCLass_Reg/>
          {feeFrequecy!="One Time"&&
          <>
            <MonthsPay_Red/>
            <Payment_Dates_Reg_Sections/>
            </>
          }
         </div>
       
    )
}



export default DynamicSections_Reg