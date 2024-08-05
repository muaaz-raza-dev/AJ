import { useTrackChanges } from '@/Hooks/Common/useTrackChanges'
import useFetchClassPaymentInfo from '@/Hooks/Teacher&Class/useFetchClassPaymentInfo'
import { Button } from '@/shdcn/components/ui/button'
import  { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const CPCFormSubmit:FC<{loading:boolean}> = ({loading}) => {
let {watch} = useFormContext()
let {isLoading,data,isFetched} = useFetchClassPaymentInfo()
let  {changes,UpdateState}=useTrackChanges(watch())
useEffect(() => {
if(data&&isFetched){
  setTimeout(() => {
    UpdateState(watch())
    
  }, 100);
}

}, [isLoading])

  return (
    <div className="flex justify-end">
<Button
disabled={loading||!changes}
type="submit"
className="px-4 py-2 text-sm font-medium hover:bg-dark text-white bg-dark border border-transparent rounded-md shadow-sm hover:darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:darker"
>
 Confirm
            </Button>
          </div>
  )
}

export default CPCFormSubmit