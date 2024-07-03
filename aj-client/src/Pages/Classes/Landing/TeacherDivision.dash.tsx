import useReadTeachers from '@/Hooks/Teacher&Class/useReadTeachers'
import TeacherCardsSection from './Components/Cards/Teacher/TeacherCardsSection.dash'

const TeacherDivision = () => {
   useReadTeachers() //* to fetch read all teachers
  return (
    <>
          <TeacherCardsSection/>
    </>
  )
}

export default TeacherDivision