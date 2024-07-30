import useScreenSizeTracker from '@/Hooks/utils/useScreenSizeTracker';
import { Tooltip } from 'antd';
import  { FC, ReactNode, } from 'react'


const SubSidebarLinks_Shrinked :FC<{children:ReactNode,label:string}> = ({children,label}) => {
const size =useScreenSizeTracker()
if(size =="lg"){
  return (
    <Tooltip title={label} placement={'right'}  >
  {children}
</Tooltip>
  )
}
else return children
}

export default SubSidebarLinks_Shrinked