import { Iuser } from '@/Api/Settings/GetUsers.api'
import RequestLoading from '@/Global/Loaders/RequestLoding'
import useGetUsers from '@/Hooks/Settings/useGetUsers'
import { useToggleIndividualBlockUser } from '@/Hooks/Settings/useToggleGlobalRestriction'
import { Tooltip } from 'antd'
import moment from 'moment'
import  { FC } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdBlock,  MdVerified } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DeleteUserCompont from './DeleteUserCompont.set'

const EachUserComp:FC<{data:Iuser;isBlocked:boolean}> = ({data,isBlocked}) => {
  let {data:d} =useGetUsers()
  return (
    <div className={`w-[24%] max-md:w-full max-lg:w-[48%]  bg-[var(--box)] dark:bg-dark dark:text-white rounded-md
       shadow-md max-h-72 p-2 px-4
       transition-all
     ${data.isBlocked||d?.payload.isTemporaryBlocked&&"grayscale"}`}>
    <div className="flex justify-between  items-center">
      {data.isBlocked?
<Tooltip title={"Access Block"} >
<MdBlock className="text-danger" size={24}/>
</Tooltip> 
      :
        <Tooltip title={d?.payload.isTemporaryBlocked?"Temporary blocked":"Access given"}>
    <MdVerified className="text-[var(--success)]"  size={20}/>
        </Tooltip>
        }
        {!isBlocked&&<ToggleRestrictionButtons data={data}/>  
        }
    </div>

    <div className=" flex  justify-center py-1 items-center w-full  flex-col gap-2">
      <div className="flex justify-between w-full items-center">
<div className="flex  gap-2 items-center">
<img src={data.photo||"/images/sample.png"} className="h-14 w-14 rounded-full object-cover" alt="" />
<div className="flex flex-col ">
<h1 className="hFont text-lg whitespace-nowrap leading-tight font-semibold">{data.Name}</h1>
<p className="hFont text-sm font-semibold text-gray-500 dark:text-gray-400 leading-tight">@{data.username}
</p>
<p className='text-xs md:hidden '>{moment(data.LastLogin).fromNow()}</p>
</div>

</div>
<div className=" flex gap-2 px-2 pt-2  ">
  <Tooltip title={"Edit"}>
    <Link to={`/settings/user/edit/${data._id}`}>
      <FaUserEdit    size={22} className='text' />
    </Link>
  </Tooltip>
    
<DeleteUserCompont id={data._id}/>


</div>


</div>


<div className="flex flex-col gap-2 w-full max-md:flex-row max-md:flex-wrap   ">

<div className=" p-1 flex justify-between  max-md:w-[48%] px-3 font-semibold text-sm  rounded-lg hover:bg-[var(--primary)] transition-colors border border-gray-200">
<h1 className="text-gray-500 dark:text-gray-400  w-[60%]">Account type</h1>
<p>{data.Role}</p>
</div>
<div className=" p-1 flex justify-between max-md:hidden  px-3 font-semibold text-sm  rounded-lg hover:bg-[var(--primary)] transition-colors border border-gray-200">
<h1 className="text-gray-500 dark:text-gray-400  w-[40%]">Last Login</h1>
<p>{moment(data.LastLogin).fromNow()}</p>
</div>
<div className=" p-1 flex justify-between max-md:w-[48%]  px-3 font-semibold text-sm  rounded-lg hover:bg-[var(--primary)] transition-colors border border-gray-200">
<h1 className="text-gray-500 dark:text-gray-400  w-[60%]">isStaff</h1>
<Link to={"/dashboard/teachers"} className="">{data.isStaff?"Yes":"No"}</Link>
</div>
</div>
    </div>
    
    </div>
  )
}


const ToggleRestrictionButtons:FC<{data:Iuser}> = ({data}) =>{
  let{mutate,isLoading} =useToggleIndividualBlockUser()
return <div className="">
{!data.isBlocked?
<button disabled={isLoading} onClick={()=>mutate(data._id)} className='px-2 text-white font-medium tracking-wider py-1 text-xs bg-danger rounded-md'>
  {

    isLoading?
    <RequestLoading  size="16" stroke="2"/>
    : `Block ${data.username}`
    }
   </button>:
<button disabled={isLoading} onClick={()=>mutate(data._id)} className='px-2 text-black  font-medium tracking-wider py-1 text-xs bg-[var(--success)] rounded-md'>
{

isLoading?
<RequestLoading  size="16" stroke="2"/>
: `Unblock ${data.username}`
}
 </button>
}
</div>
}
export default EachUserComp