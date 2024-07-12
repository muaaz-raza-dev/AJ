import RequestLoading from '@/Global/Loaders/RequestLoding'
import { Button } from '@/shdcn/components/ui/button'
import  { FC } from 'react'

const SessionRegFormSubmit:FC<{loading:boolean}> = ({loading}) => {

  return (
    <div className='w-full flex items-center justify-end px-4 my-4'>
           <Button disabled={loading} className="bg-dark text-white border border-dark hover:text-dark" type='submit'>
            {loading ?<RequestLoading size="16" /> :"Submit"}
           </Button>
      </div>
  )
}

export default SessionRegFormSubmit