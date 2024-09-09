import { IdiaryCreate } from "@/app/Types/IdiaryCreate";
import { Button, Input } from "antd";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImCross } from "react-icons/im";

export default function TagInformationSelection() {
  const { watch, setValue } = useFormContext<IdiaryCreate>();
  const [input, setinput] = useState("");
  const tags = watch("tags");
  const addTag = () => {
    if (input != "") {
      setValue("tags", tags.concat(input));
      setinput("");
    }
  };

  const deleteTag = (id: number) =>
    setValue(
      "tags",
      tags.filter((_, i) => i != id)
    );

  return (
    <div className="">
      <h1 className="hFont font-semibold  pb-1 ">Tags (Optional)</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={({ target: { value: val } }) => setinput(val)}
          />
          <Button htmlType="button" onClick={()=>addTag()}>Add</Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((t, i) => (
            <div className="border-dark border-2 font-medium px-4 py-1 rounded-md w-max relative text-sm">
              <p>{t}</p>
              <button
              type="button"
                onClick={() => deleteTag(i)}
                className="bg-danger text-white rounded-full hover:opacity-90 transition-opacity
           aspect-square p-1 shadow-sm  absolute -right-2 -top-2"
              >
                <ImCross size={6} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
