import { IstudentShort } from '@/app/Types/IstudentsDir.t'
import { TableCell, TableRow } from '@/shdcn/components/ui/table'
import { Mail, Phone } from 'lucide-react'
import { FC } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { Link} from 'react-router-dom'

const StudentsTableRow :FC<{data:IstudentShort}> = ({data}) => { 
  return (
    <TableRow >
        <TableCell className='text-[var(--darker)] text-base font-bold'>{data.FirstName} {data.LastName}</TableCell>
        <TableCell className='text-[var(--dark)] font-bold'>#{data.GRNO}</TableCell>
        <TableCell className='text-[var(--darker)] font-semibold'>{data.fatherName}</TableCell>
        <TableCell className='text-[var(--dark)] font-bold'>{data.RollNo}</TableCell>
        <TableCell className='text-[gray] font-medium'>{data.DOA}</TableCell>
        <TableCell className='flex gap-x-4 justify-start'>
            <a href={`https://mail.google.com/mail/?view=cm&to=${data?.email}`} target="_blank" className="p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square">
                <Mail  size={18}/>
            </a>
            <a  href={data.WA?`https://wa.me/+92${data?.WA?.split("+92")[1]}`:`tel:+92${ 
                 data?.contact[0][0]?.split("+92")[1] ||""}`} target="_blank" className={`p-2 cursor-pointer transition-colors hover:bg-[var(--dark)] hover:text-white bg-[var(--bg)] text-[var(--dark)] rounded-full aspect-square`}>
                {
                    data.WA?
                    <FaWhatsapp  size={18}/>:
                <Phone size={18}/>
                }
            </a>
        </TableCell>
        <TableCell className=''>
            <div className="bg-[var(--dark)] center text-white rounded-full px-2 py-1.5">
                {data.Class} {data.Section}
            </div>
            </TableCell>
        <TableCell className=' '>
                <Link to={`/students/${data.GRNO}`} className="center bg-black">
           
        <IoEllipsisHorizontalSharp size={22}/>
          
                </Link>
</TableCell>
      </TableRow>
  )
}

export default StudentsTableRow
