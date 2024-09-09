import { useAppSelector } from "@/app/ReduxHooks";
import { IdiaryCreate } from "@/app/Types/IdiaryCreate";
import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash";
import { Button } from "antd";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImCross } from "react-icons/im";

export default function ClassInformation() {
  const { Classes,Sections } = useAppSelector((s) => s.global);
  const { watch, setValue } = useFormContext<IdiaryCreate>();
  const [input, setinput] = useState("");
  const classes = watch("classes");

  const addClass = () => {
    if (input != "") {
      setValue("classes", classes.concat({class:input,sections:Object.keys(Sections[input])}));
      setinput("");
    }
  };

  const addAllClass = () => {
      setValue("classes", Object.keys(Classes).map((cl)=>({class:cl,sections:Object.keys(Sections[cl])})));
      setinput("");
  };

  const deleteClass = (id: number) => {{
    setValue(
      "classes",
      classes.filter((_, i) => i != id)
    );
  }}

  return (
    <div>
      <h1 className="hFont font-semibold  pb-1 ">Classes (Required)</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <CustomSelect_Reg
            optimumData={Object.entries(Classes).map((e) => ({
              label: e[1],
              value: e[0],
            }))}
            state={input}
            setState={(val) => setinput(val)}
          />
          <Button  htmlType="button"   onClick={addClass}>Add</Button>
          <Button  htmlType="button" className="bg-box text-dark" onClick={addAllClass}>Select All</Button>
        </div>
        <div className="flex  gap-2 flex-wrap">
          {classes.map((cl, i) => (
            <>
            <div className="bg-dark text-white font-medium px-4 py-1 rounded-md w-max relative">
            <p className="hFont">{Classes[cl.class]}</p>
              <button
              type="button"
                onClick={() => deleteClass(i)}
                className="bg-danger text-white rounded-full hover:opacity-90 transition-opacity aspect-square p-1 shadow-sm absolute -right-2 -top-2"
                >
                <ImCross size={6} />
              </button>
            </div>
                </>
          ))}
        </div>
      </div>
    </div>
  );
}
