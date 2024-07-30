import { useFormContext } from 'react-hook-form'
import SettingsLabelWrapper from '../Components/SettingsLabelWrapper.set'
import { Input, Tooltip } from 'antd'
import { IaccountInfo } from '@/app/Types/IAccountInfo'
import useValidateUsername from '@/Hooks/Teacher&Class/useValidateUsername.api'
import { useDebouncedCallback } from 'use-debounce'
import RequestLoading from '@/Global/Loaders/RequestLoding'

const AccountBasicInfoSection = () => {
  let {watch} =useFormContext<IaccountInfo>()
  let Role= watch("Info.Role")
  return (
    <>
   <ProfilePhotoResetComp/>
    <SettingsLabelWrapper label="Username" description="Unique identity of your account .">
    <div className="min-w-[60%]  md:min-w-[40%] flex  gap-4">
       <UsernameField />
    </div>
</SettingsLabelWrapper>
<SettingsLabelWrapper label="Account Role" >
    <div className="min-w-[60%] md:min-w-[40%]  flex  gap-4 ">
        <Input className='dark:bg-dark dark:border-none  dark:text-white' value={Role} />
</div>
</SettingsLabelWrapper>
    </>
  )
}

import { MdCancel } from "react-icons/md"
import useGetAccountInfo from '@/Hooks/Settings/useGetAccountInfo'
import { VerifiedIcon } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import ProfilePhotoResetComp from '../Profile/ProfilePhotoResetComp.set'

const UsernameField = ()=>{
  let {setValue,watch} =useFormContext<IaccountInfo>()
  let {data:vData,mutate,isLoading} = useValidateUsername()
  let {data} =useGetAccountInfo()
  let username= watch("Info.username")
    const [loading, setloading] = useState(false)
  let debounced = useDebouncedCallback((value)=>{
      if(value&&data&& data.payload.username!=value){
          mutate(value)
        }
        setloading(false)
  },1000)
 
return  (<div className="flex items-center dark:bg-dark dark:border-none dark:text-white box-border bg-[var(--box)] gap-1 border border-[#8080806b] rounded-md  w-full">
      <Input value={username} onChange={({target:{value}})=>{setValue("Info.username",value);setloading(true);debounced(value)}} placeholder="@Jeaset" className='border-none outline-none dark:bg-dark dark:border-none dark:text-white focus:outline-0 focus:ring-0 focus-within:ring-0 max-md:text-base'  />
<div className="flex w-[15%] items-center justify-end px-6">
<ValidationComp loading={loading} username={username} vData={vData} data={data} isLoading={isLoading} />
</div>
</div>)
}

const ValidationComp:FC<{username:string,isLoading:boolean;loading:boolean;vData:any;data:any}> = ({data,isLoading,loading,username,vData})=>{
  let {setValue} =useFormContext<IaccountInfo>()
  useEffect(()=>{
    if(vData?.success){
        setValue("isVerified",true)
    }
    else {setValue("isVerified",false)}
  },[vData])
    if(username) {
        if(loading||isLoading) {
            return <RequestLoading  dark  size="20" stroke="3" />
        }
        else{
            if(vData?.success) {
                return <Tooltip title="username is available"><VerifiedIcon size={20} className="text-green-700 dark:text-green-300 "  /></Tooltip>
            }
            else{
                if(data && data?.payload.username == username) return null
                else {
                    return <Tooltip title="username is taken. Try another one"><MdCancel  size={20}  className="text-red-600"/></Tooltip>
                }
            }
        }
    }
    
    
}
export default AccountBasicInfoSection