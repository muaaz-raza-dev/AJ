import useReadClasses from '@/Hooks/Teacher&Class/useReadClasses'
import ClassCardsSection from './Components/Cards/Class/ClassCardsSection.dash'
import { useEffect } from 'react'
import { useAppSelector } from '@/app/ReduxHooks'

const ClassDivision = () => {
  let {refetch} = useReadClasses()
  let sections =useAppSelector(s=>s.dashboard.Filters.Sections.selected)
  useEffect(() => {
  refetch()
  }, [sections])
  return (<ClassCardsSection/>)
}

export default ClassDivision