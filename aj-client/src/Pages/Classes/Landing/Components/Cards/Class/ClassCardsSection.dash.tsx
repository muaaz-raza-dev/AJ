import { useAppSelector } from "@/app/ReduxHooks"
import ClassCard from "./ClassCard.dash"
import RequestLoading from "@/Global/Loaders/RequestLoding"

const ClassCardsSection = () => {
  let Classes =useAppSelector(s=>s.dashboard.payload.Classes.Filtered)
  let isLoading =useAppSelector(s=>s.dashboard.isLoading)
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
              <RequestLoading dark/>
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