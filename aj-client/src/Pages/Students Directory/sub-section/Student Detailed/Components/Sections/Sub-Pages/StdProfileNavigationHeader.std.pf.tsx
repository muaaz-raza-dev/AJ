import { Link } from "react-router-dom"


const StdProfileNavigationHeader = () => {
  return (
    <div className="w-full p-4 flex gap-x-2 rounded-md bg-gradient-to-r text-md hFont from-[var(--darker)] to-[var(--dark)] ">
        <Link to={""} className={`center  min-w-24 drop-shadow rounded-xl text-[1rem]  bg-[var(--box)] p-2 relative`}>
            <p>Fees</p>
            </Link>
        <Link to={"Attendance"} className={`center min-w-24  drop-shadow rounded-md bg-transparent p-2 text-[var(--box)] relative ProfileUnderline `}>
          <p>
          Attendance
          </p>
        
        </Link>
        <Link to={"edit"} className="center min-w-24  drop-shadow rounded-md bg-transparent p-2 text-[var(--box)] relative ProfileUnderline ">Student's information</Link>
    </div>
  )
}

export default StdProfileNavigationHeader