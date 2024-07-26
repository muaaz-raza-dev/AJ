import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const StudentDetailedSkeletonLoader = () => {
  return (
<div className="  w-full flex gap-x-2">
    <div className=" w-[55%] h-[84vh]    ">
    <Skeleton className=' dark:bg-dark h-[10%] flex justify-between flex-wrap gap-4'/>
    <Skeleton className=' dark:bg-dark ' count={12} direction='ltr' duration={20} />
    <Skeleton className=' dark:bg-dark h-[10%] flex justify-between flex-wrap gap-4'/>
    <Skeleton className=' dark:bg-dark h-[40%] flex justify-between flex-wrap gap-4'/>
    </div>
    <div className=" w-[40%] h-[84vh]   ">
    <div className="   h-[40%] mb-4">
    <Skeleton className=" dark:bg-dark h-full" />
    </div>
    <Skeleton className=' dark:bg-dark h-[20%] mb-5 '/>
    <Skeleton className=' dark:bg-dark h-[10%]'/>
    <Skeleton className=' dark:bg-dark h-[10%]'/>
    <Skeleton className=' dark:bg-dark h-[10%]'/>
    </div>
</div>
  )
}
export const SkeletonLoader = () => {
  return (
    <>
    <Skeleton className=' dark:bg-dark h-[20%]' baseColor='transparent'/>
    <Skeleton className=' dark:bg-dark h-[10%]' baseColor='transparent'/>
    <Skeleton className=' dark:bg-dark h-[10%]' baseColor='transparent'/>
    <Skeleton count={5} className=' dark:bg-dark h-[4%] flex justify-between flex-wrap gap-4' baseColor='transparent'/>
    </>
  )
}
export default StudentDetailedSkeletonLoader