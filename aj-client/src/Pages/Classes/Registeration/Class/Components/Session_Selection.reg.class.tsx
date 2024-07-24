import React, { useEffect } from "react";
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash";
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash";
import { useAppSelector } from "@/app/ReduxHooks";
import { useFormContext } from "react-hook-form";

const Session_Selection = () => {
  let Sessions =useAppSelector(s=>s.global.Sessions)
  let session_value = useFormContext().watch("SessionId");
  let [state, setState] = React.useState(session_value);
  let { setValue } = useFormContext();
  useEffect(() => {
    setValue("SessionId", state);
  }, [state]);
  
  return (
    <LabelWrapper required label="Pick Session" className="w-full">
      <CustomSelect_Reg
      optimumData={Object.entries(Sessions).map(e=>({label:e[1],value:e[0]}))}
        nosearch
        placeholder="Session"
        setState={setState}
        state={session_value}
      />
    </LabelWrapper>
  );
};

export default Session_Selection;
