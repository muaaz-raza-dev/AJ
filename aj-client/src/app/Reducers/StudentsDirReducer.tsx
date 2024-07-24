import { PayloadAction } from "@reduxjs/toolkit";
import { IstudentDir, IstudentShort } from "../Types/IstudentsDir.t";
interface IPayload {
  StudentsData?: IstudentShort[];
  StudentsRawData?: {[key:string]:IstudentShort[]};
  MutableData?: IstudentShort[];
  count?: number;
  totalPages?: number;
  isLoading?: boolean;
  isNotFound?: boolean;
  classes?: string[];
  SelectedClass?: string;
  SearchMode?: string;
  totalStudents?:number;
  Filters?:{Class?:string,Polio?:boolean,Covid?:boolean}
  q?: string;
}
interface ISearchedGlobal extends IPayload{searchedData:IstudentShort[];hasData:boolean}


const InsertStudentDirState = (
  state: IstudentDir,
  {
    payload: {
      StudentsData,
      SearchMode,
      SelectedClass,
      count,
      MutableData,
      isLoading,
      isNotFound,
      classes,
      totalPages,totalStudents,Filters
    },
  }: PayloadAction<IPayload>
) => {

  if (Filters) {
    state.Filters = { ...state.Filters, ...Filters };
  }
  if (StudentsData!=undefined){
    state.StudentsData[count??1]=StudentsData
  }
  if (SearchMode !== undefined) {
    state.SearchMode = SearchMode;
  }
  if (totalStudents !== undefined) {
    state.totalStudents = totalStudents;
  }
  if (SelectedClass !== undefined) {
    state.SelectedClass = SelectedClass;
  }
  if (count !== undefined) {
    state.count = count;
  }
  if (MutableData !== undefined) {
    state.MutableData = MutableData;
  }
  if (isLoading !== undefined) {
    state.isLoading = isLoading;
  }
  if (isNotFound !== undefined) {
    state.isNotFound = isNotFound;
  }
  if (classes !== undefined) {
    state.classes = classes;
  }
  if (totalPages !== undefined) {
    state.totalPages = totalPages;
  }
};
export const InsertMoreStudentsData = (
  // state: IstudentDir,
  // { payload }: PayloadAction<IPayload>
) => {
  // payload.StudentsData!=undefined&&state.StudentsData[state.count]=payload.StudentsData;
};

export const SearchStudents = (
  state: IstudentDir,
  { payload }: PayloadAction<IPayload>
) => {
    let Results =[]
  if (payload.q != "" && payload.StudentsRawData !== undefined) {
    state.MutableData = Results= Object.values(payload.StudentsRawData)
      ?.flat(2)
      .filter((elm) => {
        if (payload.SearchMode == "Name") {
          return (
            elm.FirstName.toLowerCase().includes(
              payload.q?.toLowerCase() ?? ""
            ) ||
            elm.LastName.toLowerCase().includes(payload.q?.toLowerCase() ?? "")
          );
        } else if (payload.SearchMode == "GRNO") {
          return elm.GRNO ==(payload.q ?? "");
        }
      });
      if (Results.length==0) {state.isNotExists=true ; state.isLoading=true}
  } else if (payload.q === "" && payload.StudentsRawData !== undefined) {
    state.MutableData = state.StudentsData[payload.count || 0];
    state.isLoading=false
    state.isNotExists=false 
    state.isNotFound=false
  }
};

export  function SearchedGlobal(  state: IstudentDir,
    { payload }: PayloadAction<ISearchedGlobal >){
        state.MutableData=payload.searchedData,
        state.isNotExists=false
        state.isLoading=false,
        state.isNotFound = !payload.hasData
}

export function SwitchClass (state:IstudentDir,){
  state.StudentsData = {}
}
export default InsertStudentDirState;
