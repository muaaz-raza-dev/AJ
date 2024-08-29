import React from 'react'
import EachDiaryCard from './EachDiaryCard.diary'

export default function DiaryCardsSection() {
  return (
    <main className="flex flex-wrap gap-2">
        <EachDiaryCard/>
        <EachDiaryCard/>
        <EachDiaryCard/>
        <EachDiaryCard/>
    </main>
  )
}
