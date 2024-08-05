import RequestLoading from '@/Global/Loaders/RequestLoding'
import { Button } from '@/shdcn/components/ui/button'
import  { FC } from 'react'

const ClassRegFormSubmit :FC<{loading:boolean}> = ({loading}) => {
    return (
      <div className='w-full flex items-center justify-end px-4 my-4'>
           <Button disabled={loading} className="bg-dark w-full dark:hover:text-white hover:border-darker 
           dark:bg-darker text-white border border-dark  hover:bg-darker" type='submit'>
            {loading ?<RequestLoading size="16" /> :"Register"}
           </Button>
      </div>
    )
  }
  

export default ClassRegFormSubmit