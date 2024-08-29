
import { createSlice } from "@reduxjs/toolkit"
import { defaultIdiaryPageState, IdiaryPageState } from "../Types/Idiary"
import { InsertDiaryPayloadFn, InsertFiltersFn } from "../Reducers/DiaryReducer"

export const DiaryPageState: IdiaryPageState = defaultIdiaryPageState
export const DiarySlice = createSlice({
    name: "Diary Slice",
    initialState: DiaryPageState,
    reducers: {ReddlInsertPayload:InsertDiaryPayloadFn,ReddlInsertFilters:InsertFiltersFn}
})
export const {ReddlInsertFilters,ReddlInsertPayload} = DiarySlice.actions
export const diarySlice = DiarySlice.reducer