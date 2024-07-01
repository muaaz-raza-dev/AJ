import RequestLoading from '@/Global/Loaders/RequestLoding'
import { Button } from '@/shdcn/components/ui/button'
import { FC } from 'react'
const Teacher_Reg_Submit:FC<{loading:boolean}> = ({loading}) => {
  return (
    <div className='w-full flex items-center justify-end px-4 my-4'>
         <Button className="bg-dark text-white border border-dark hover:text-dark" type='submit'>
          {loading ?<RequestLoading size="16" /> :"Submit"}
         </Button>
    </div>
  )
}

export default Teacher_Reg_Submit