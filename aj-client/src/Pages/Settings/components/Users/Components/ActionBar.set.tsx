import { Avatar, Tooltip } from "antd"
import { MdBlockFlipped, MdVerifiedUser } from "react-icons/md"
import useGetUsers from "@/Hooks/Settings/useGetUsers"

const ActionBar = () => {
  let {data} =useGetUsers()
  return (
    <section className="flex gap-4 px-2 justify-between ">
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
  
    </div>
</section>
  )
}

export default ActionBar