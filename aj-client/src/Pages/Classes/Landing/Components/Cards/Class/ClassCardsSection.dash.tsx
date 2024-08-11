import { useAppSelector } from "@/app/ReduxHooks"
import ClassCard from "./ClassCard.dash"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import useReadClasses from "@/Hooks/Teacher&Class/useReadClasses"

const ClassCardsSection = () => {
  let Classes =useAppSelector(s=>s.dashboard.payload.Classes.Filtered)
  let {isLoading} = useReadClasses()
  return (
    <main className="flex gap-2  w-[100%] min-h-max   overflow-y-auto flex-wrap">
      {
        Classes.length === 0 &&(
          <div className="flex justify-center items-center w-[100%] h-[100%] ">
            <h1 className="text-2xl text-center text-gray-500 font-black">No Classes Found</h1>
          </div>
        ) 
      }

        {
          isLoading ? (
            <div className="flex justify-center items-center w-[100%] h-[100%] ">
              <RequestLoading dark stroke="5" />
            </div>
          ) :
          Classes.map((data, index) => {
            return <ClassCard key={index} data={data} />
          })
        }
    </main>
  )
}

export default ClassCardsSection