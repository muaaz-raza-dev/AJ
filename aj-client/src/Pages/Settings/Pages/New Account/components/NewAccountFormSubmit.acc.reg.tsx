import RequestLoading from '@/Global/Loaders/RequestLoding'
import { useTrackChanges } from '@/Hooks/Common/useTrackChanges'
import { Button } from '@/shdcn/components/ui/button'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const NewAccountFormSubmit:FC<{loading:boolean}> = ({loading}) => {
  let state = useFormContext().watch()
  const {changes,UpdateState} =useTrackChanges(state)
  useEffect(() => { if(!loading)UpdateState(state)}, [loading])
  return (
    <Button
    type='submit'
    disabled={loading||!changes}
    className="text-white bg-dark hover:bg-dark"
    >
      {loading? 
      <RequestLoading size='16' stroke='2' />
      :
  "  Register"
  }
  </Button>
  )
}

export default NewAccountFormSubmit