import { tailspin } from 'ldrs'
import { FC, useEffect } from 'react';

const RequestLoading:FC<{dark?:boolean,size?:string,stroke?:string}> = ({dark,size,stroke}) => {
useEffect(() => {
    tailspin.register()
}, []);

    // Default values shown

    
    // Default values shown
   return <l-tailspin
      size={size||"40"}
      stroke={stroke||"5"}
      speed="0.9" 
      color={dark?"black":"white"} 
    ></l-tailspin>
}

export default RequestLoading
