
import RegSectionHeader from '../Helpers/RegSectionHeader.dash'
import LabelWrapper from '../Helpers/LabelWrapper.dash'
import { Input, Tooltip } from 'antd'
import { useFormContext } from 'react-hook-form'
import Account_Role from '../Components/Account_Role.ts.reg'
import { FC } from 'react'
import { Info } from 'lucide-react'
import Account_Username from '../Components/Account_Username.ts.reg'

const Account_Details_Teacher:FC<{edit?:boolean}> = ({edit}) => {
  let form =useFormContext()
  return (
    <RegSectionHeader label={"Account Details"}>
    <LabelWrapper required label="Username" >
     <Account_Username edit={edit}/>
    </LabelWrapper>
    <LabelWrapper required label="Password">
      <div className="flex gap-4 items-center h-full">
      <Input.Password  value={form.watch("account_Details.password")} onChange={(e)=>form.setValue("account_Details.password",e.target.value)}  placeholder="Password" className="dark:bg-darker dark:text-white dark:border-darker"/>
        {edit&&
      <Tooltip title="Password will be unchanged if you keep this feild remain empty. ">
      <Info className='text-orange-500' size={22} />
      </Tooltip>
    }
      </div>
    </LabelWrapper>
    <Account_Role/>
    </RegSectionHeader>
  )
}

export default Account_Details_Teacher