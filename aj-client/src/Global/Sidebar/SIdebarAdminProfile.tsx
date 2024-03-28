import useLogout from '@/Hooks/Auth/useLogout';
import { useAppSelector } from '@/app/ReduxHooks';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Tooltip } from 'antd';
import { CiLogin,  CiSettings } from 'react-icons/ci';
const SidebarAdminProfile = () => {
  let {logOut} =useLogout()
  let {Info:{Name,Role}} = useAppSelector(s=>s.credits)
  return (
    <div className="md:w-full   flex gap-x-2 md:py-5 justify-between items-center">
       <Space size={24}>
    <Badge dot color='#a098ae'>
      <Avatar shape="circle" icon={<UserOutlined />} src="/images/sample.png" />
    </Badge>
  </Space>
  <div className="flex w-full items-center max-md:hidden justify-between">
    <div className="">
    <h1 className='hFont'>{Name}</h1>
    <p className='text-[0.7rem] -pb-1 text-[var(--bg)]'>{Role}</p>
    </div>
    <div className="">
    <Tooltip placement="top" title={"Settings"} >
    <button className='hover:bg-[var(--primary)] hover:text-[var(--dark)] p-1 rounded'><CiSettings size={24}/></button>
      </Tooltip>
    <Tooltip placement="top" title={"Log out"} >
    <button onClick={()=>logOut()} className='hover:bg-[var(--primary)]  hover:text-[var(--dark)] p-1 rounded'><CiLogin size={24}/></button>
        </Tooltip>
    </div>
  </div>
    </div>
  )
}

export default SidebarAdminProfile
