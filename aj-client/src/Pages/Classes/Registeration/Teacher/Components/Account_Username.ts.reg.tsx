import { useFormContext } from "react-hook-form"
import { FC } from "react"
import { useDebouncedCallback } from "use-debounce"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import { MdCancel } from "react-icons/md"
import { FaCheck } from "react-icons/fa"
import useValidateUsername from "@/Hooks/Teacher&Class/useValidateUsername.api"
import { Tooltip } from "antd"

const Account_Username:FC<{edit?:boolean}> = ({edit}) => {
    let form =useFormContext()
    let {data,mutate,isLoading} = useValidateUsername()
    let username = form.watch("account_Details.username")
    let debounced = useDebouncedCallback((value)=>{
        if(value){
            mutate(value)
        }
        form.setValue("account_Details.username",value)
    },1000)
    const ValidationComp = ()=>{
        if(username&&!edit) {
            if(isLoading) {
                return <RequestLoading  dark  size="20" stroke="3" />
            }
            else{
                if(data?.success) {
                    return <Tooltip title="username is available"><FaCheck size={20} className="text-gray-500"  /></Tooltip>
                }
                else{
                    return <Tooltip title="username is taken. Try another one"><MdCancel  size={20}  className="text-red-600"/></Tooltip>
                }
            }
        }
        else{
            return null

        }
        
    }
  return (
    <div className="flex items-center box-border gap-1 border border-[#8080806b] rounded-md  w-full">
     <input
    onChange={({target:{value}})=>debounced(value)}
    className="  p-2 w-[85%]  outline-none "
    {...(edit?{value:username}:{})}
    id="username" 
    disabled={edit?true:false}/>
    <div className="flex w-[15%] items-center justify-end px-6">
    <ValidationComp />
    </div>
    </div>
  )
}


export default Account_Username