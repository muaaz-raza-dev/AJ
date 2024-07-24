import { PayloadAction } from "@reduxjs/toolkit"
import { IlandingSessions, Isessions } from "../Types/Isessions";
interface  IPayload {
          Original ?: Isessions[]
          Filtered ?: Isessions[]
      type:"Sessions",
      isLoading?:boolean
}

const InsertSessionPayload = (state:IlandingSessions,{payload:{Original,Filtered,type,isLoading}}:PayloadAction<IPayload>) => {
      if(Original) state.payload[type].Original =Original
      if(Filtered) state.payload[type].Filtered =Filtered
      if(isLoading!=undefined) state.isLoading =isLoading
}


export default InsertSessionPayload