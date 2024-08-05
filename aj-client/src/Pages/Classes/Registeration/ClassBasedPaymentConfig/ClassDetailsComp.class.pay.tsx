import useFetchClassPaymentInfo from '@/Hooks/Teacher&Class/useFetchClassPaymentInfo'
import { Link } from 'react-router-dom'

const ClassDetailsComp = () => {
  let {data} = useFetchClassPaymentInfo()
  let q = data?.payload.ClassDetails
return (
<section className="w-full p-4 flex gap-2 items-end  rounded-lg bg-dark text-white   pb-4">
<Link to={`/dashboard/class/${q?._id}`} className="text-3xl  font-bold  text-white hFont">{q?.name} Class</Link>
<Link to={"/sessions"} className="px-2 py-1 text-sm hFont bg-darker text-white rounded-md">{q?.SessionId.session_name} {q?.SessionId.acedmic_year}</Link>
</section>
          )
}

export default ClassDetailsComp