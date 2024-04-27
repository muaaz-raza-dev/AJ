import { Label } from "@/shdcn/components/ui/label"
import { Switch } from "@/shdcn/components/ui/switch"

  
const StdSpecificOptions = () => {
  return (
    <div className="w-full px-4 ">
      <div className="flex flex-col  justify-center w-full gap-2 px-4 py-1  rounded-md text-[var(--dark)] text-xs" >
        <div className="flex items-center">
          <div className="flex justify-between border rounded shadow-inner p-1 w-full items-center gap-y-2">
            <Label className="ml-1 rounded-md hFont " htmlFor="account-switch">
             Digital profile access
            </Label>
            <Switch id="account-switch" className="bg-[var(--dark)] " color="red" />
          </div>
        </div>
        {/* <div className="flex items-center">
        <div className="flex justify-between border rounded shadow-inner p-1 w-full items-center gap-y-2">
        <Label className="ml-1 rounded-md hFont " htmlFor="account-switch">
              Sent
            </Label>
            <Switch id="profile-switch" />
          </div>
        </div> */}
        <div className="flex items-center">
        <div className="flex justify-between border rounded shadow-inner p-1 w-full items-center gap-y-2">
        <Label className="ml-1 rounded-md hFont " htmlFor="account-switch">
              Push Notification
            </Label>
            <button className=" bg-indigo-700 hover:bg-[var(--dark)] py-1 px-3 rounded-md text-white transition-colors" >
                Notify
            </button>

          </div>
        </div>
      </div>
    </div>

  )
}

export default StdSpecificOptions