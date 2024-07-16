import React from 'react'

const HistoryFileHeaderSection = () => {
  return (
    <div className="flex gap-4 ">
    <div className="flex justify-between bg-gradient-to-bl to-[#fd535388]  from-dark overflow-hidden relative w-[33%]  rounded-xl shadow  gap-2  h-32">
    <div className="flex flex-col gap-2 w-full p-4 py-8">
        <div className="flex gap-2 hFont  items-center font-bold">
        <p className="hFont text-[0.9rem] font-bold">Total Dues
             </p>
            <div className="bg-danger text-white rounded-full text-xs px-3 py-0.5">All</div>
        </div>
        <h1 className="text-4xl font-bold">72,8490 Pkr</h1>
    </div>
</div>
<div className="flex justify-between bg-gradient-to-bl to-[#1eba629d]   from-dark overflow-hidden relative w-[33%]  rounded-xl shadow-md   gap-2  h-32">
    <div className="flex flex-col gap-2 w-full p-4 py-8">
        <div className="flex gap-2 hFont text-sm items-center font-bold">
        <p className="hFont text-[0.9rem] font-bold">Total Upcoming payments
             </p>
            <div className="bg-black text-white rounded-full text-xs px-3 py-0.5">Grinds</div>
        </div>
        <div className="flex gap-2 items-center">
        <h1 className="text-4xl font-bold">72,8490 Pkr</h1>
        </div>
        
    </div>


</div>
<div className="flex justify-between bg-gradient-to-bl to-dark_dimmer   from-dark overflow-hidden relative w-[33%]  rounded-xl shadow-md   gap-2  h-32">
    <div className="flex flex-col gap-1 justify-between  w-full p-4 py-6">
        <div className="flex gap-2 hFont text-sm items-center font-bold">
        <h1 className="text-3xl font-bold">David Colson</h1>
        </div>
        <p className="hFont text-[0.9rem] font-bold">Student for +2 years
</p>
        <div className="flex justify-end gap-2 font-bold">
            <button className="rounded-full bg-black px-4 py-1 text-white text-sm">Details</button>
            <button className="rounded-full bg-[var(--box)] px-4 py-1 text-dark text-sm">Add payment</button>
        </div>
        
    </div>


</div>
    </div>
  )
}

export default HistoryFileHeaderSection