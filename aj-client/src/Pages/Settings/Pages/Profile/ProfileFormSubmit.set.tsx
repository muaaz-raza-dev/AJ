import RequestLoading from "@/Global/Loaders/RequestLoding"
import { useTrackChanges } from "@/Hooks/Common/useTrackChanges"
import useGetPersonalInformation from "@/Hooks/Settings/useGetPersonalInformation"
import { Button } from "@/shdcn/components/ui/button"
import { FC, useEffect } from "react"
import { useFormContext } from "react-hook-form"

const ProfileFormSubmit:FC<{loading:boolean,success:boolean}> = ({loading,success}) => {
  let {isLoading,isSuccess,data} =useGetPersonalInformation()
  let {watch} = useFormContext()
  let {changes,UpdateState} =useTrackChanges(watch())

  useEffect(() => {
  if(!isLoading&&isSuccess&&data)UpdateState(watch())
  }, [isLoading,isSuccess,data])
useEffect(() => {
  if(!loading&&success)UpdateState(watch())
}, [loading,success,])

  return (
    <div className="flex items-center  justify-end py-4  gap-1  w-[90%]">
    <Button disabled={!changes||loading} className="text-white bg-dark hover:bg-dark">
      {loading
      ?
      <RequestLoading stroke="2"  size="16" />
      :

      "Update"
    }
      </Button>
</div>
  )
}

export default ProfileFormSubmit