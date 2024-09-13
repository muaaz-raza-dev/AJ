import { useAppSelector } from "@/app/ReduxHooks";
import { IdiaryCreate } from "@/app/Types/IdiaryCreate";
import CustomSelect_Reg from "@/Pages/Classes/Registeration/Teacher/Helpers/CustomSelect_Reg.dash";
import { Button } from "antd";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ImCross } from "react-icons/im";

export default function SectionInformation() {
  const { watch, setValue } = useFormContext<IdiaryCreate>();
  const classes = watch("classes");
  const addSection = (
    sectionId: string,
    classId: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const payload = classes.map((cl) => {
      if (cl.class != classId) {
        return cl;
      } else {
        return { ...cl, sections: cl.sections.concat(sectionId) };
      }
    });
    setValue("classes", payload);
    setInput("");
  };

  const deleteSection = (sectionId: string, classId: string) => {
    const payload = classes.map((cl) => {
      if (cl.class != classId) {
        return cl;
      } else {
        return {
          ...cl,
          sections: cl.sections.filter((sec) => sec != sectionId),
        };
      }
    });
    setValue("classes", payload);
  };

  return (
    <div>
      <h1 className="hFont font-semibold  pb-2 "> Sections (Required)</h1>
      <div className="flex flex-col gap-2">
        {classes.map((cl) => (
          <EachSectionComp
            class={cl}
            addSection={addSection}
            deleteSection={deleteSection}
          />
        ))}
      </div>
    </div>
  );
}

const EachSectionComp = ({
  class: cl,
  addSection,
  deleteSection,
}: {
  class: { class: string; sections: string[] };
  addSection: (
    sectionId: string,
    classId: string,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  deleteSection: (sectionId: string, classId: string) => void;
}) => {
  const [input, setinput] = useState("");
  const { Classes, Sections } = useAppSelector((s) => s.global);
  return (
    <div className="flex flex-col gap-2">
      <div className=" justify-between">
        <h2 className="hFont font-medium text-dark bg-primary dark:bg-dark rounded-md dark:text-white p-2 ">
          Class {Classes[cl.class]} Sections
        </h2>
      </div>
      <div className="flex gap-2">
        <CustomSelect_Reg
          optimumData={Object.entries(Sections?.[cl.class]||{}).map((e) => ({
            label: e[1],
            value: e[0],
          }))}
          className="dark:border rounded-md"
          state={input}
          setState={(val) => setinput(val)}
          nosearch
        />
        <Button  htmlType="button" className="dark:text-white" onClick={() => addSection(input, cl.class, setinput)}>
          Add
        </Button>
      </div>
      {cl.sections.map((sec) => {
        return (
          <div className="bg-dark text-white font-medium px-4 py-1 rounded-md w-max relative">
            <p className="hFont">{Sections?.[cl.class]?.[sec]}</p>
            <button
              type="button"
              onClick={() => deleteSection(sec, cl.class)}
              className="bg-danger text-white rounded-full hover:opacity-90 transition-opacity aspect-square p-1 shadow-sm
                 absolute -right-2 -top-2"
            >
              <ImCross size={6} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
