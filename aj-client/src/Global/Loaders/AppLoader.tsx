import {ring } from 'ldrs'
import { useEffect } from 'react';
import { trefoil } from 'ldrs'

const AppLoader = () => {
    useEffect(() => {
        trefoil.register()
    }
, []);
    
    // Default values shown
    return (
<div className="w-screen h-screen z-10 fixed top-0 bg-darker  center  flex-col gap-12 text-white overflow-hidden">
<l-trefoil
  stroke-length="0.15"
  bg-opacity="0.1"
  size="124"
  stroke="8"
  speed="3" 
  color="white" 
></l-trefoil>
<h1 className='text-6xl max-md:text-3xl hFont font-bold'> AJ WorkSpace </h1>
</div>
    )

}

export const Fetching_Request = () => {
    useEffect(() => {
        ring.register()

        },
        
     []);
        
        // Default values shown
        return (
            <div className="w-screen h-screen z-[999] fixed left-0 top-0 bg-[#000000d2] center ">
                <div className=" text-white px-8 py-5 flex gap-2 rounded bg-[#000000d2]">
            <l-ring
            size="30"
            stroke={"3"}
            speed="1" 
            color="white" 
            ></l-ring>
            <h1>Fetching</h1>
            </div>
            </div>
        )
        
}
export default AppLoader