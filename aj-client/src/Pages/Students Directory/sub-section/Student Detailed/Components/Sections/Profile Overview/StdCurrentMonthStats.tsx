import moment from "moment"

const StdCurrentMonthStats = () => {
  return (
    <div className="bg-[var(--box)] rounded-lg py-4 flex flex-col px-4 gap-y-3">
        <div className="flex px-4 w-full py-1 bg-[var(--dark)] rounded-md">
            <div className="bg-[var(--bg)] py-2 SmoothArrowRightRadius flex items-center flex-col   w-[50%] text-[var(--darker)] hFont">
                <b className=" ">
                Fee Cleared 
                </b>
                <p className="text-green-700">April</p>
                {/* <PiCheckCircleBold size={29}  className="text-green-700"/> */}
            </div>
            <div className=" w-[50%] py-2 gap-y-1 flex items-center flex-col rounded-md  text-[var(--bg)]  ">
            <b className="SmoothVerticalTextShadow  hFont">
                Profile Access 
                </b>
                <div className="text-xs">  {moment(new Date(Date.now()-1000*60*40)).fromNow()}</div>
                {/* <PiArrowSquareDownFill size={29} className="text-green-500"/> */}
            </div>
            </div>
            </div>
  )
}

export default StdCurrentMonthStats