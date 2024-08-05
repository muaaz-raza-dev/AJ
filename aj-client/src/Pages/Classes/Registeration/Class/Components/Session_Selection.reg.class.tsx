import  { useEffect } from "react";
import LabelWrapper from "../../Teacher/Helpers/LabelWrapper.dash";
import CustomSelect_Reg from "../../Teacher/Helpers/CustomSelect_Reg.dash";
import { useAppSelector } from "@/app/ReduxHooks";
import { useFormContext } from "react-hook-form";

const Session_Selection = () => {
  let { setValue,watch } = useFormContext();
  let Sessions =useAppSelector(s=>s.global.Sessions)
  let session_value = watch("SessionId");

  const SetSessions= (Session:string)=>{
    setValue("SessionId", Session);

  }
  useEffect(()=>{
    setValue("SessionId", Object.keys(Sessions)[0]);
  },[Sessions])

  
  return (
    <LabelWrapper required label="Pick Session" className="w-full">
      <CustomSelect_Reg
      optimumData={Object.entries(Sessions).map(e=>({label:e[1],value:e[0]}))}
        nosearch
        placeholder="Pick a Session"
        setState={SetSessions}
        state={session_value}
      />
    </LabelWrapper>
  );
};

export default Session_Selection;
