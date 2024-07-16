import { Link } from 'react-router-dom'

const NewStudentLink = () => {
  return (
    <Link to={"registeration"} className=' center p-2 px-4 bg-[var(--primary)] text-dark rounded-md font-semibold text-sm border-2 border-dark'>
      Register student
    </Link>
  )
}

export default NewStudentLink
