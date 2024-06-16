import ClassCard from "./ClassCard.dash"

const ClassCardsSection = () => {
  return (
    <main className="flex gap-4  w-[70%] flex-wrap h-[70vh] overflow-y-auto">
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>
      <ClassCard/>
    </main>
  )
}

export default ClassCardsSection