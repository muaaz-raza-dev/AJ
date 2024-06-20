import { GoClock } from "react-icons/go"

const Teacher_Details = () => {
  return (
    <div className='w-[25%] flex flex-col gap-2 '>
      <div className="flex flex-col h-12 bg-dark items-center justify-center text-white hFont font-bold text-xl bg-[var(--primary)] rounded-md shadow ">
        <h1>Teacher Details</h1>
</div>
 {
  Array(5).fill("").map(_=><Each_Teacher_Deatail_Block/>)
 }


                
    </div>
  )
}

const Each_Teacher_Deatail_Block= ()=>{
  return       <div className="flex flex-col  bg-[var(--box)] rounded-md shadow ">
  <div  className={`w-full h-2 bg-dark rounded-tl-md rounded-tr-md `}></div>
  <div className="flex w-full gap-2 flex-wrap">
  <div className="p-2 flex flex-col gap-1 w-full">
    <div className="flex justify-between w-full">

    <div className="flex gap-1 items-center">
<img src="/images/teacher_sample.jpg" alt="" className="w-8 h-8 rounded-full"/>
<div className="">

    <h2 className="hFont  font-semibold leading-tight">Kayley Watson</h2>
    <p className="text-dark text-sm leading-tight">Class Teacher</p>
</div>
    </div>
    <div className="flex gap-2  text-sm h-max  items-center">
      <GoClock size={15}/>
      <p>120 minutes</p>
    </div>
    </div>
    <div className="">
<h3 className="font-bold my-1">Subjects :</h3>
<div className="flex flex-wrap gap-1">
<p className="p-1 text-[0.82rem] rounded-md  border-2 border-dark_dimmer ">Chemistry</p>
<p className="p-1 text-[0.82rem] rounded-md  border-2 border-dark_dimmer ">Chemistry</p>
</div>
      <div>
        <img src="images/avatar/1.jpg" className="avatar avatar-lg" alt=""/>
      </div>

    </div>
  
    </div>
    </div>
</div>
}

export default Teacher_Details