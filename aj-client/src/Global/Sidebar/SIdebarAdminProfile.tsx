import useLogout from '@/Hooks/Auth/useLogout';
import useActiveRoute from '@/Hooks/Common/ActiveRoute';
import { useAppSelector } from '@/app/ReduxHooks';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Tooltip } from 'antd';
import { CiLogin,  CiSettings } from 'react-icons/ci';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SidebarAdminProfile = () => {
  let {logOut} =useLogout()
  let toggle= useAppSelector(e=>e.global.Expand_Navbar)
let {Info:{Name,Role,photo}} = useAppSelector(s=>s.credits)
let {ValidateRoute}= useActiveRoute()
if(toggle){
  return (
    <div className="md:w-full   flex gap-x-2 md:py-5 justify-between items-center">
    <Space size={24}>
    <Badge  color='#a098ae'>
      <Avatar shape="circle" icon={<UserOutlined />} src={photo||"/images/sample.png"} />
    </Badge>
  </Space>

  <div className="flex w-full items-center max-md:hidden justify-between">
    <div className="">
    <h1 className='hFont leading-tight'>{Name}</h1>
    <p className='text-[0.8rem] leading-tight -pb-1 text-[var(--bg)]'>{Role}</p>
    </div>
    <div className="">
    <Tooltip placement="top" title={"Settings"} >
      <Link to={"/settings"} >
    <button className='hover:bg-light hover:text-[var(--dark)] p-1 rounded'><CiSettings size={24}/></button>
      </Link>
      </Tooltip>
    <Tooltip placement="top" title={"Log out"} >
    <button onClick={()=>logOut()} className='hover:bg-light  hover:text-[var(--dark)] p-1 rounded'><CiLogin size={24}/></button>
        </Tooltip>
    </div>
  </div>
    </div>
  )
}
else {
  let ActiveClassName="!bg-[var(--light)] !text-[var(--dark)] !dark:text-[var(--ligth)] border-none rounded-md"
  return  <div className='flex flex-col gap-2 w-full'>
        <Link
          to={"/settings"}
          className={` w-full center transition-colors hover:bg-[var(--light)] hover:border-transparent hover:text-[var(--dark)]
            text-[var(--light)] hover:rounded   border-[var(--primary)] md:py-3 max-md:py-1 ${ValidateRoute({
            toCompare: "/settings",
            exact: false,
            classesToApply:ActiveClassName
              ,
          })}  flex gap-x-4`}
        >
          <FaCog size={24}/>
        </Link>
   <div className=" w-full center">
  <Tooltip placement="right" title={"Log out"} >
  <button onClick={()=>logOut()} className=' w-full center py-2 hover:bg-light  hover:text-[var(--dark)]  rounded'><CiLogin strokeWidth={1}  size={28}/></button>
      </Tooltip>
  </div>

        </div>
}
}

export default SidebarAdminProfile
