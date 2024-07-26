import RequestLoading from '@/Global/Loaders/RequestLoding'
import { Button } from '@/shdcn/components/ui/button'
import { FC } from 'react'
const Teacher_Reg_Submit:FC<{loading:boolean}> = ({loading}) => {
  return (
    <div className='w-full flex items-center justify-end px-4 my-4'>
         <Button disabled={loading} className="bg-darker text-white border border-dark hover:bg-dark" type='submit'>
          {loading ?<RequestLoading size="16" /> :"Submit"}
         </Button>
    </div>
  )
}

export default Teacher_Reg_Submit