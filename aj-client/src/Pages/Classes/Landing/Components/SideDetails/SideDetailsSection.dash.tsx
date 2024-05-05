import ClassActions from "./ClassActions.dash"
import DetailFields from "./DetailFields.dash"
import RecentAdmissions from "./RecentAdmissions.dash"

const SideDetailsSection = () => {
  return (
    <div className="w-[30%] h-full bg-[var(--box)]  rounded-md p-1 px-2 flex flex-col gap-1">
        <div className=" flex justify-between p-2 rounded-md items-center text-2xl">
      <h1 className=" font-bold hFont py-2">Class Details</h1>
  <div className="hFont  font-bold p-1 bg-dark text-white rounded-lg px-3"> 6th</div>
</div>
  <DetailFields/>
  <RecentAdmissions/>
  <ClassActions/>


    </div>
  )
}

export default SideDetailsSection