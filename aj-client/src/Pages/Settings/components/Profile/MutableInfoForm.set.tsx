import SettingsLabelWrapper from "../Components/SettingsLabelWrapper.set"
import CustomInputs_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomInputs_Reg.dash"
import { useFormContext } from "react-hook-form"

const MutableInfoForm = () => {
    let form =useFormContext()
  return (
    <>


<SettingsLabelWrapper label="Full Name" description="Update your first and last name .">
    <div className="min-w-[40%] max-sm:min-w-[60%] flex max-md:flex-col  gap-4">
        <CustomInputs_Reg field_name="firstName" formContext={form} placeholder="First Name"  />
        <CustomInputs_Reg field_name="lastName" formContext={form} placeholder="Last Name"  />
    </div>
</SettingsLabelWrapper>

<SettingsLabelWrapper label="Phone number" description="update your whatsApp number from here.">
    <div className="min-w-[40%] max-sm:min-w-[60%] flex  gap-4">
    <CustomInputs_Reg field_name="phone" formContext={form} placeholder="+92XXX-XXXXXXXX"  />
    </div>
</SettingsLabelWrapper>

<SettingsLabelWrapper label="WhatsApp number" description="update your primary and alternate contact numbers.">
    <div className="min-w-[40%] max-sm:min-w-[60%] flex  gap-4">
    <CustomInputs_Reg field_name="wa" formContext={form} placeholder="+92XXX-XXXXXXXX"  />
    </div>
</SettingsLabelWrapper>

<SettingsLabelWrapper label="Email">
    <div className="min-w-[40%] max-sm:min-w-[60%] flex  gap-4">
    <CustomInputs_Reg field_name="email" formContext={form} placeholder="e.g yourssharky@gmail.com"  />
</div>
</SettingsLabelWrapper>
<SettingsLabelWrapper label="CNIC" description="update your CNIC number.">
    <div className="min-w-[40%] max-sm:min-w-[60%] flex  gap-4">
    <CustomInputs_Reg field_name="CNIC" formContext={form} type="string" placeholder="XXXX-XXXXXXXXX-XX"  />
</div>
</SettingsLabelWrapper>
<SettingsLabelWrapper label="address" description="update your resendential address here (Optional).">
    <div className="min-w-[40%] max-sm:min-w-[60%] flex  gap-4">
    <CustomInputs_Reg field_name="address" formContext={form}  placeholder="Your address"  />
</div>
</SettingsLabelWrapper>

    </>
  )
}

export default MutableInfoForm