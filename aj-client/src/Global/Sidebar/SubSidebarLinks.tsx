import { Tooltip } from 'antd';
import  { FC, ReactNode, } from 'react'


const SubSidebarLinks_Shrinked :FC<{children:ReactNode,label:string}> = ({children,label}) => {
return (

<Tooltip title={label} placement='right' >
  {children}
</Tooltip>
  )
}

export default SubSidebarLinks_Shrinked