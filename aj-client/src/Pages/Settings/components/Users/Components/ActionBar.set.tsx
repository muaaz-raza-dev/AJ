import { Avatar, Tooltip } from "antd"
import { MdBlockFlipped, MdVerifiedUser } from "react-icons/md"
import useGetUsers from "@/Hooks/Settings/useGetUsers"
import useToggleGlobalRestriction from "@/Hooks/Settings/useToggleGlobalRestriction"
import RequestLoading from "@/Global/Loaders/RequestLoding"
const ActionBar = () => {
  let {data} =useGetUsers()
  let {mutate,isLoading} = useToggleGlobalRestriction()
  return (
    <section className="flex gap-4 px-2 justify-between">
    <div className="flex gap-2 items-center">
<Avatar.Group maxCount={4}>
  {data?.payload.Users.map(e=>(
    <Tooltip title={e.Name}>
<Avatar src={e.photo||"/images/sample.png"}  className="border-none "/>
</Tooltip>
)
)}

</Avatar.Group>
<p className="text-gray-600 text-sm font-medium dark:text-white">{data?.payload.Users.length} users</p>
    </div>
    <div className="gap-4 flex  items-center">
      {!data?.payload?.isTemporaryBlocked? 
      <Tooltip title={"All allowed users can access it with thier accounts."}>
      <div className="flex gap-1 items-center text-gray-500 dark:text-white"><MdVerifiedUser className="text-green-700" size={18} /> Access Given </div>
      </Tooltip>
      :
      <Tooltip title={"No user can access thier accounts."}>
      <div className="flex gap-1 items-center text-gray-500 dark:text-white "><MdBlockFlipped className="text-danger "/> Temporary blocked </div>
      </Tooltip>

    }
    <button onClick={()=>mutate()} className={`  text-sm px-4 py-2 whitespace-nowrap max-md:px-3 rounded-md border-danger border hover:bg-danger  transition-colors ${data?.payload?.isTemporaryBlocked? 
    "text-black  !border-green-400  dark:bg-green-700 dark:text-white bg-green-400 hover:bg-green-500 ":
    " bg-danger text-white  dark:text-white dark:bg-red-700 hover:text-white "} `}>
      {isLoading?
      <RequestLoading  size="16" stroke="2"/>
      :
      data?.payload?.isTemporaryBlocked ? "Grant Access" : "Restrict Access "
      }
      </button>
    </div>
</section>
  )
}

export default ActionBar