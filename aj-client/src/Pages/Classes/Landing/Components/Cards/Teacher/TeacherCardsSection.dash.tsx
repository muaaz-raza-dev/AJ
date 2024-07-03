import { useAppSelector } from "@/app/ReduxHooks"
import TeacherCard from "../Teacher/TeacherCard.dash"
import { capitalizeFirstLetter } from "@/Hooks/utils/Capitalize_special"
import RequestLoading from "@/Global/Loaders/RequestLoding"
const TeacherCardsSection = () => {
  let data = useAppSelector(s=>s.dashboard.payload.Teachers.Filtered)
  let {isLoading }= useAppSelector(s=>s.dashboard)
  return (
    <main className="flex gap-4  w-full flex-col min-h-[70vh] overflow-y-auto">
       {
       data.length 
?
       data.map((val)=>{
        
return <div className="w-full  flex flex-col gap-2">
            <h1 className="hFont font-bold text-xl">{capitalizeFirstLetter(val.acedmic_role+"s")}</h1>
            <div className="flex gap-4  w-full flex-wrap ">
            {
              !isLoading ?
              (!val.docs.length )? (
                <h1 className="hFont font-bold text-xl w-full text-center text-gray-500">No {val.acedmic_role}s registered</h1>
              ) : 

    val.docs.map((elm) => <TeacherCard data={elm} />) :
    <div className="center w-full">
    <RequestLoading dark/>
    </div>
}
            </div>
        </div>
        
            
        
        })
      :
      <h1 className="hFont font-bold text-xl w-full text-center text-gray-500">No Teacher found</h1>

      }

</main>
  )
}

export default TeacherCardsSection


