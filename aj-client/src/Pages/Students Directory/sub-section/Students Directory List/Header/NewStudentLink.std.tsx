import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const NewStudentLink = () => {
  return (
    <Link to={"registeration"} className=' p-2 px-4 bg-dark dark:bg-light dark:text-dark text-light rounded-md font-semibold
     text-sm border-2 items-center gap-1  dark:border-darker border-dark flex'>
      <Plus size={18} />
      <b>
       Register student
      </b>
    </Link>
  )
}

export default NewStudentLink
