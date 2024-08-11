import useReadTeachers from '@/Hooks/Teacher&Class/useReadTeachers'
import TeacherCardsSection from './Components/Cards/Teacher/TeacherCardsSection.dash'
import { useAppSelector } from '@/app/ReduxHooks'
import { useEffect } from 'react'

const TeacherDivision = () => {
   let {refetch}=useReadTeachers() //* to fetch read all teachers
  let sections =useAppSelector(s=>s.dashboard.Filters.Sections.selected)
  useEffect(() => {
  refetch()
  }, [sections])

  return (
    <>
    <TeacherCardsSection/>
    </>
  )
}

export default TeacherDivision