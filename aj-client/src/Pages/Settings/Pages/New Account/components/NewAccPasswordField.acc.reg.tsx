import { IaccountRegister } from '@/app/Types/IAccountRegister'
import LabelWrapper from '@/Pages/Classes/Registeration/Teacher/Helpers/LabelWrapper.dash'
import { Input, Tooltip } from 'antd'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { BiInfoSquare } from 'react-icons/bi'

const NewAccPasswordField:FC<{edit?:boolean}> = ({edit}) => {
    let {watch,setValue} =useFormContext<IaccountRegister>()
    let password = watch("password")
  return (
    <LabelWrapper required label="Password" labelClassName=" ">
      <div className="flex gap-2 items-center">

    <Input.Password className='dark:bg-dark dark:border-darker dark:text-white' value={password} required={!edit}
    onChange={({target:{value}})=>setValue("password",value)}
    placeholder="Pick the Stronger password"/>
{edit&&
<Tooltip title={"Keep this field remain empty. To unchange the password."}>
<BiInfoSquare size={22}/>
</Tooltip>
}
  </div>
  </LabelWrapper>
  )
}

export default NewAccPasswordField