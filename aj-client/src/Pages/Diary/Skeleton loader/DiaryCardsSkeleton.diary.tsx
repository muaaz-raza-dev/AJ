import Skeleton from 'react-loading-skeleton'

export default function DiaryCardsSkeleton() {
  return (
    <div className='flex gap-4 flex-wrap mt-4'>
      <Skeleton width={350} height={350}/>
      <Skeleton width={350} height={350}/>
      <Skeleton width={350} height={350}/>
      <Skeleton width={350} height={350}/>
    </div>
  )
}
