import { PayloadAction } from "@reduxjs/toolkit";
import { Idiary, IdiaryPageState } from "../Types/Idiary";
interface Ipayload {
  payload: Array<Idiary>;
}
interface IfiltersSelected {
  type: "selected";
  date?: string;
  session?: string;
  Class?: string;
  section?: string;
}
interface IfiltersAvailable {
  type: "available";
  sessions?: { [key: string]: string };
  classes?: { [key: string]: { [key: string]: string } };
  sections?: { [key: string]: { [key: string]: string } };
}

type Ifilters = IfiltersSelected | IfiltersAvailable;

export const InsertDiaryPayloadFn = (
  state: IdiaryPageState,
  { payload }: PayloadAction<Ipayload>
) => {
  state.diaries = payload.payload;
};

export const InsertFiltersFn = (
  state: IdiaryPageState,
  { payload }: PayloadAction<Ifilters>
) => {
  if (payload.type == "selected") {
    const { date, session, section, Class } = payload;
    if (date) state.filters.selected.date = date;
    if (session) state.filters.selected.session = session;
    if (section) state.filters.selected.section = section;
    if (Class) state.filters.selected.Class = Class;
  }
  else {
    const {  sessions, sections,classes } = payload;
    if (sessions) state.filters.available.sessions = sessions;
    if (sections) state.filters.available.sections = sections;
    if (classes) state.filters.available.classes = classes;
  }
};
