import { IaccountInfo } from "@/app/Types/IAccountInfo"
import { useTrackChanges } from "@/Hooks/Common/useTrackChanges"
import { Button } from "@/shdcn/components/ui/button"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

const AccountInfoFormSubmit = () => {
    let {setValue,watch}= useFormContext<IaccountInfo>()
    let isLoaded  =watch("isLoaded")
    let isUpdatePassword = watch("isUpdatePassword")
    let isVerified = watch("isVerified")
    let {changes,UpdateState} =useTrackChanges({...watch("Info"),...watch("Passwords")})
    useEffect(() => {
    if(isLoaded) UpdateState({...watch("Info"),...watch("Passwords")})
    }, [isLoaded])
  return (
<div className="flex items-center  justify-end py-4  gap-3  w-[90%]">
<Button  onClick={()=>setValue("isUpdatePassword",!isUpdatePassword)} type="button" className="text-white active:scale-95 transition-transform bg-darker hover:bg-darker">Update Password</Button>
<Button disabled={isUpdatePassword ? false:!isVerified||!changes } className="text-white bg-dark hover:bg-dark">Update</Button>
</div>
  )
}

export default AccountInfoFormSubmit