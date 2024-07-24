import { useFormContext } from 'react-hook-form'
import SettingsLabelWrapper from '../Components/SettingsLabelWrapper.set'
import { Input } from 'antd'
import { IaccountInfo } from '@/app/Types/IAccountInfo'
import { useState } from 'react'

const AccountPasswordInfoSection = () => {
    const [Passwords, setPasswords] = useState({password:"",rpassword:"",matches:false})
    let {watch  ,setValue} =useFormContext<IaccountInfo>()
    let password =watch("isUpdatePassword")
    let currentPaswword = watch("Passwords.currentPassword")
    let handlePasswordValidation = (type:"password"|"rpassword",val:string)=>{
        if(type=="password") {
            setPasswords(e=>({...e,password:val}))
        }
        else if(type=="rpassword") {
            setPasswords(e=>({...e,rpassword:val}))
            if(Passwords.password!=val)  setPasswords(e=>({...e,matches:false}))
            else {setPasswords(e=>({...e,matches:true})) ;setValue("Passwords.newPassword",val)}
        }
    }
    if(!password) return null
  return (
    <>
      <SettingsLabelWrapper label="Current Password" description="Enter your current password " >
        <div className="min-w-[40%] flex  gap-4">
            <Input.Password required  value={currentPaswword}  onChange={(e)=>setValue("Passwords.currentPassword",e.target.value)} placeholder='Your Current Password'  className='dark:bg-dark dark:border-none dark:text-white placeholder:dark:text-gray-400' />
    </div>
    </SettingsLabelWrapper>
    <SettingsLabelWrapper label="New Password" description="Set your new password " >
        <div className="min-w-[40%] flex  gap-4">
<Input.Password required  value={Passwords.password}  onChange={(e)=>handlePasswordValidation("password",e.target.value)} placeholder="Enter New password"  className='dark:bg-dark dark:border-none dark:text-white dark:placeholder:text-gray-200 '   />
<Input.Password required value={Passwords.rpassword} onChange={(e)=>handlePasswordValidation("rpassword",e.target.value)}  placeholder="Re-Enter password"  className='dark:bg-dark dark:border-none dark:text-white dark:placeholder:text-gray-200 '  />
    </div>
    {Passwords.password&&!Passwords.matches&&
<p className='text-red-700 text-xs'>Password doesn't match</p>
    }
    </SettingsLabelWrapper>
    </>
  )
}

export default AccountPasswordInfoSection