
const TeacherSideDetailSection = () => {
  return (
    <div className="w-[30%] h-full bg-[var(--box)]  rounded-md p-1 px-2 flex flex-col gap-1">
             <div className=" flex justify-between p-2 rounded-md items-center text-2xl">
      <h1 className=" font-bold hFont py-2">Teacher Details</h1>
</div>
<div className="">
    <div className="">
        <div className="flex flex-col items-center justify-center ">
        <img src="/images/sample.png" alt=""  className="w-20 h-20 rounded-full object-fill"/>
        <h1 className="hFont font-semibold leading-none text-lg tracking-tight mt-1">Nigeria Stein </h1>
        <p className="text-[gray] text-xs">yourshharky@gmail.com</p>
        <div className="w-[90%] h-[0.1rem] bg-gray-200 my-4"></div>
        </div>
    </div>

</div>
    </div>
  )
}

export default TeacherSideDetailSection