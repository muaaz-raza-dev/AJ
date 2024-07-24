
import RequestLoading from "@/Global/Loaders/RequestLoding";
import useTransactionConfig from "@/Hooks/Transactions/useTransactionConfig";
import { Input, Switch } from "antd";
import moment from "moment";
import { useState } from "react";
const MonthlyTransactionConfigModal = () => {
  // let { Transaction_Config_update } = useAppSelector((state) => state.global);
  let {mutate,isLoading}= useTransactionConfig()
  const [Inputs, setInputs] = useState<{
    Monthly: boolean;
    Annual: boolean;
    dueDate: string;
    Error?:boolean;
  }>({ Monthly: true, Annual: false, dueDate: "" ,Error:false});
  // if (Transaction_Config_update) {
    function SubmitHandler (){
      if (Inputs.dueDate!="")mutate(Inputs)
      else setInputs({...Inputs,Error:true})
    }
    return (
      <div className="  bg-[#00000047] z-20 w-[80%] h-screen fixed top-0 left-[20%] center  ">
        <form onSubmit={(e)=>{e.preventDefault();SubmitHandler()}} className="rounded-lg bg-white h-max backdrop:blur-md  z-30 w-[60%]    shadow-lg p-6">
          <div className="text-center mt-2">
            <h1 className="text-[var(--darker)] hFont font-bold text-2xl">
              Monthly Transaction Configuration
            </h1>
            <h2 className="text-[var(--dark)] hFont font-bold text-xl">
              {moment().format("MMMM-Y")}
            </h2>
            <p className="text-gray-500 text-xs">
              Transaction settings for monthly cycles, optimizing financial
              operations with ease.
            </p>
            <div className="py-4 border-b border-indigo-50">
              <div className=" flex gap-2 flex-col">
                <div className="flex flex-col gap-2">
                  <div className="w-full p-2 bg-[var(--primary)] border flex gap-x-2  text-sm font-extrabold touch-pinch-zoom  text-[var(--darker)] hFont">
                    <Switch
                      onChange={(e) => setInputs({ ...Inputs, Monthly: e })}
                      checked={Inputs.Monthly}
                      defaultChecked
                      id="Monthly Fee"
                      className="bg-[gray]"
                    />
                    <label htmlFor="Monthly Fee">Monthly Fee</label>
                  </div>
                  <div className="w-full p-2 bg-[var(--primary)] border flex gap-x-2 items-center text-sm font-extrabold touch-pinch-zoom  text-[var(--darker)] hFont">
                    <Switch
                      id="Annual Fee"
                      checked={Inputs.Annual}
                      onChange={(e) => setInputs({ ...Inputs, Annual: e ,Error:false})}
                      defaultChecked={false}
                      className="bg-[gray]"
                    />
                    <label htmlFor="Annual Fee">Annual Fee</label>
                  </div>
                  <div className=" p-2 bg-[var(--primary)] border flex flex-col gap-1 text-sm font-bold touch-pinch-zoom items-start text-[var(--darker)] hFont w-[100%]">
                    <span className="text-xs">Due date (Monthly Fee)
                    {Inputs.Error&&<b className="text-red-500 px-2">Required</b>}
                     </span>
                    <Input
                      placeholder="Due Date"
                      value={Inputs.dueDate}
                      onChange={(e) =>
                        setInputs({ ...Inputs, dueDate: e.target.value })
                      }
                      type="date"
                      className="text-[var(--darker)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button className="text-white py-2 px-4 rounded-lg bg-[var(--dark)] shadow-md font-medium  transition-colors"> 
            {isLoading?<RequestLoading/>:
            "  Confirm"
            }
            </button>
          </div>
        </form>
      </div>
    );
  
};

export default MonthlyTransactionConfigModal;
