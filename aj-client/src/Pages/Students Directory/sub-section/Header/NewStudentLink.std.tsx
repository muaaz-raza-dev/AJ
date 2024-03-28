import { Tooltip } from 'antd'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const NewStudentLink = () => {
  return (
    <Link to={"/registeration"} className='aspect-square center p-2 bg-[var(--dark)] rounded-full text-white'>
        <Tooltip title="Register new student"> 
 <FaPlus size={22}/>
        </Tooltip>
    </Link>
  )
}

export default NewStudentLink
