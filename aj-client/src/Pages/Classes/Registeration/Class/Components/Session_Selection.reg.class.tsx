import React, { useEffect } from "react";
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash";
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash";
import { useAppSelector } from "@/app/ReduxHooks";
import { useFormContext } from "react-hook-form";

const Session_Selection = () => {
  let sessions = useAppSelector((s) => s.dashboard.RequiredInfo.Sessions);
  let session_value = useFormContext().watch("SessionId");
  let [state, setState] = React.useState(session_value);
  let { setValue } = useFormContext();
  useEffect(() => {
    setValue("SessionId", sessions[state]?._id);
  }, [state]);
  console.log(session_value,sessions ,sessions[session_value]?._id);
  
  return (
    <LabelWrapper required label="Pick Session" className="w-full">
      <CustomSelect_Reg
        data={[]}
      optimumData={Object.entries(sessions).map(e=>({label:e[0],value:e[1]._id}))}
        nosearch
        placeholder="Session"
        setState={setState}
        state={session_value || sessions[0]?._id }
      />
    </LabelWrapper>
  );
};

export default Session_Selection;
