import { useAppSelector } from '@/app/ReduxHooks'
import RequestLoading from '@/Global/Loaders/RequestLoding'
import { useTrackChanges } from '@/Hooks/Common/useTrackChanges'
import { Button } from '@/shdcn/components/ui/button'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const PaymentConfigFormSubmit :FC<{loading:boolean,edit?:boolean}> = ({loading,edit}) => {
  let form  = useFormContext()
  let payload =form.watch("payload")
  let isLoading =useAppSelector(s=>s.paymentConfigsL.register.isLoading)
  let {changes,UpdateState}= useTrackChanges(payload)
  useEffect(() => {
    if(edit&&!isLoading){
        let Payload = JSON.parse(JSON.stringify(payload))
        UpdateState(Payload)
    }
  }, [isLoading])
  // console.log(changes);
  
  
  return (
    <Button type="submit" disabled={loading||(edit?!changes:false)} className="text-white my-4 bg-dark w-full transition-colors hFont hover:bg-darker">
            {loading ?<RequestLoading size="18" /> : edit?"Update":"Register"}
  </Button>
  )
}

export default PaymentConfigFormSubmit