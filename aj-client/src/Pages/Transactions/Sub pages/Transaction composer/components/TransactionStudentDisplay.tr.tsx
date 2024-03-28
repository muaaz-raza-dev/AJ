import { useAppSelector } from '@/app/ReduxHooks'
import  Skeleton  from 'react-loading-skeleton'
import Ld from "lodash"
import 'react-loading-skeleton/dist/skeleton.css'
const TransactionStudentDisplay = () => {
    let {student} =useAppSelector(state=>state.trCompose)
    
    return (<>
            {
                Ld.size(student)!=0 ? 
                <div className="flex shadow-inner border gap-2 rounded bg-[var(--bg)] px-2 py-4  w-[50%] "> 
                <div className="w-[20%] h-full rounded ">
                    {student?.photo?
                    <img src={student?.photo} alt="" className='bg-white rounded-md border' />:
                <Skeleton  className='h-full w-full'/>
                    }
                </div>
                <div className="w-[80%] flex flex-col gap-2">
                <div className="flex gap-x-2 hFont text-xs font-bold"><span>
                    GRNO :
                    </span>
                    <p className='text-[var(--dark)] hFont'>
                    {student?.GRNO} 
                    </p>
</div>
                <div className="flex gap-x-2 hFont text-xs font-bold"><span>
                    Name  :
                    </span>
                    <p className='text-[var(--dark)] hFont'>
                    {student?.FirstName}
                    </p>
                    </div>
                <div className="flex gap-x-2 hFont text-xs font-bold"><span>
                    Father Name :
                    </span>
                    <p className='text-[var(--dark)] hFont'>
                    {student?.fatherName}
                    </p>
                    </div>
                </div>
                         
                </div>
           
  :
  <>
                <div className="flex shadow-inner border gap-2 rounded bg-[var(--bg)] px-2 py-2  w-[50%] "> 
  <div className="w-[20%] h-full rounded py-1">
  <Skeleton  className='h-full w-full'/>
  </div>
  <div className="w-[80%]">
                <Skeleton  count={4} className='w-full '/>
  </div>
  </div>
  </>
}
  </>
  )

}

export default TransactionStudentDisplay
