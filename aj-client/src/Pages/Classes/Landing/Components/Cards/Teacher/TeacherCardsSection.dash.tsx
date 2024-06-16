import TeacherCard from "../Teacher/TeacherCard.dash"
const TeacherCardsSection = () => {
  return (
    <main className="flex gap-4  w-[70%] flex-col h-[70vh] overflow-y-auto">
        <div className="w-full  flex flex-col gap-2">
            <h1 className="hFont font-bold ">Teachers</h1>
            <div className="flex gap-4  w-full flex-wrap ">
    <TeacherCard/>
    <TeacherCard/>
            </div>
        </div>

        <div className="w-full  flex flex-col gap-2">
            <h1 className="hFont font-bold ">Accounting staff</h1>
            <div className="flex gap-4  w-full flex-wrap ">
    <TeacherCard/>
    <TeacherCard/>
            </div>
            </div>
            
        

</main>
  )
}

export default TeacherCardsSection