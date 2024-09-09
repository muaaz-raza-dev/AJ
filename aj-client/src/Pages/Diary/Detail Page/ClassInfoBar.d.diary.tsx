import useFetchDetailedDiary from "@/Hooks/Diary/useFetchDetailedDiary";

export default function ClassInfoBar() {
  const { data } = useFetchDetailedDiary();
const sections  = data?.payload.sections
  return (
    <div>
      <section className="w-full flex gap-3 pb-4 border-b flex-wrap">
        {sections&&Object.entries(sections).map(sec=>{
          return <div className="border-dark cursor-default border-2 text-dark font-bold p-1 px-4  transition-colors  rounded-md flex justify-between gap-8">
          <b className="">Class {sec[0]} :</b> 
          <div className="flex gap-2">
            {sec[1].map(a=><p className="text-sm center bg-dark rounded-md px-2 text-white">{a.name}</p>)}
          </div>
        </div>
        })}
      
      </section>
    </div>
  );
}
