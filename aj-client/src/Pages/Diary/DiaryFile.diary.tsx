import {Routes,Route} from "react-router-dom"
import CreateDiaryPage from "./Create Diary/CreateDiaryFormPage.c.diary"
import DiaryLandingPage from "./Landing/DiaryLandingPage.diary"
export default function DiaryFile() {
  return (
    <Routes>
        <Route path="/create" element={ <CreateDiaryPage/>}/>
        <Route index element={ <DiaryLandingPage/>}/>
    </Routes>
  )
}
