
import RegSectionHeader from '../Helpers/RegSectionHeader.dash'
import LabelWrapper from '../Helpers/LabelWrapper.dash'
import CustomInputs_Reg from '../Helpers/CustomInputs_Reg.dash'
import { Input } from 'antd'
import { useFormContext } from 'react-hook-form'
import Account_Role from '../Components/Account_Role.ts.reg'

const Account_Details_Teacher = () => {
  let form =useFormContext()
  return (
    <RegSectionHeader label={"Account Details"}>
    <LabelWrapper required label="Username" >
      <CustomInputs_Reg formContext={form} field_name='account_Details.username' placeholder="james" id="username" />
    </LabelWrapper>
    <LabelWrapper required label="Password">
      <Input.Password onChange={(e)=>form.setValue("account_Details.password",e.target.value)}  placeholder="Password" className="h-full"/>
    </LabelWrapper>
    
    <Account_Role/>
    </RegSectionHeader>
  )
}

export default Account_Details_Teacher