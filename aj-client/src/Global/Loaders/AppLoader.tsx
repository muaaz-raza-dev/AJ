import {  helix ,ring } from 'ldrs'
import { useEffect } from 'react';

const AppLoader = () => {
useEffect(() => {
    helix.register()
    }
, []);
    
    // Default values shown
    return (
        <div className="w-screen h-screen z-10 fixed top-0 bg-gradient-to-tl center  to-[var(--darker)] from-[var(--darker)] center overflow-hidden">
        <l-helix
        size="200"
        speed="1" 
        color="white" 
        ></l-helix>
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