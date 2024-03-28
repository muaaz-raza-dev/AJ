import { Avatar, Badge, Space } from "antd";
import { FaRegBell } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { UserOutlined } from '@ant-design/icons';
import useHeaderLabel from "@/Hooks/Common/useHeaderLabel";
const Header = () => {
  const {ActiveLabel} =useHeaderLabel()
  return (
    <header className="w-full flex justify-between py-4">
      <h1 className=" font-black text-3xl text-[var(--darker)]">{ActiveLabel}</h1>
      <div className="flex gap-x-2 items-center">
        <div className="flex  items-center">
            <button className="p-1 h-fit aspect-square px-2  shadow-sm ">
                <Badge color="#4D44B5" dot>
                  <Avatar shape="circle" className="bg-white hover:bg-[var(--dark)] hover:text-white transition-colors duration-150" icon={
                    <FaRegBell className="secondaryText hover:text-white" size={20} />
                  }/>
                    </Badge>
            </button>
            <button className="p-1 h-fit aspect-square px-2  shadow-sm">
            <Avatar shape="circle" className="bg-white hover:bg-[var(--dark)] hover:text-white transition-colors duration-150" icon={
                <FiSettings className="secondaryText hover:text-white" size={20} />
                  }/>
            </button>
        </div>
        <div className="flex gap-x-3 items-center">
            <div className="text-sm flex flex-col items-end">

<h1 className="DarkText font-bold">Muaaz</h1>
<p className="secondaryText text-[0.6rem]">Chief-Admin</p>
            </div>
        <Space  className="">
    <Badge  >
      <Avatar size={36} shape="circle" icon={<UserOutlined />} src="/images/sample.png" className=" border border-[var(--dark)] cursor-pointer shadow" />
    </Badge>
  </Space>            
        </div>
      </div>
    </header>
  )
}

export default Header
