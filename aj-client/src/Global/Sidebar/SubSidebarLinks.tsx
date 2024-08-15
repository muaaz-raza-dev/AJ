import { useAppSelector } from '@/app/ReduxHooks';
import useScreenSizeTracker from '@/utils/useScreenSizeTracker';
import { Tooltip } from 'antd';
import  { FC, ReactNode, } from 'react'


const SubSidebarLinks_Shrinked :FC<{children:ReactNode,label:string}> = ({children,label}) => {
const size =useScreenSizeTracker()
const isExpand =useAppSelector(s=>s.global.Expand_Navbar)
if(size =="lg"){
  return (
    <Tooltip title={!isExpand&&label} placement={'right'}  >
  {children}
</Tooltip>
  )
}
else return children
}

export default SubSidebarLinks_Shrinked