import { useAppSelector } from '@/app/ReduxHooks'
import EachDiaryCard from './EachDiaryCard.diary'
import DiaryCardsSkeleton from '../../Skeleton loader/DiaryCardsSkeleton.diary'

export default function DiaryCardsSection() {
  const {diaries,isLoading} =useAppSelector(s=>s.diarySlice)
  return (
    <main className="flex flex-wrap gap-2">
      {isLoading?
      <div className="center">
        <DiaryCardsSkeleton/>
      </div> :
      diaries.length === 0 && (
        <div className="flex justify-center items-center w-full mt-8"> 
        <h1 className="text-2xl text-center text-gray-500 font-black">No Diaries Found</h1>
        </div>
        )
      }
{
  diaries?.map((diary, index) => (
    <EachDiaryCard key={index} data={diary}/>
  ))
}
    </main>
  )
}
