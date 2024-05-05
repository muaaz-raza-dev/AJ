const RecentAdmissions = () => {
  return (
    <>
    <div className="my-2 hFont  text-xl"><b>Recent Admissions</b></div>
    <div className="flex flex-col gap-1">
    <RecentAdmissionBlock/>
    <RecentAdmissionBlock/>
    <RecentAdmissionBlock/>
</div>
    </>
  )
}
const RecentAdmissionBlock= ()=> {
    return (
        <div className="bg-dark items-center  transition-colors rounded-lg h-full w-full p-2 flex justify-between  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
        <div className="flex gap-2">
          <b className="hFont">#1</b>
          <b className="hFont">Muaaz Raza</b>
        </div>
          <button className="flex gap-2 items-center bg-dark p-1 px-4 rounded-md text-white">
          Details
          </button>
    </div>  
    )
}
export default RecentAdmissions