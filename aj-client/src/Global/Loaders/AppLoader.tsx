import {  helix } from 'ldrs'
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

export default AppLoader
