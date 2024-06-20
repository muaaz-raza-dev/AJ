import ClassCard from "./ClassCard.dash"

const ClassCardsSection = () => {
  return (
    <main className="flex gap-4 flex-col w-[100%]  h-[70vh] overflow-y-auto">
      <div className="flex gap-4">
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>
      </div>
      <div className="flex gap-4">
      <ClassCard/>
      <ClassCard/>
      </div>
    </main>
  )
}

export default ClassCardsSection