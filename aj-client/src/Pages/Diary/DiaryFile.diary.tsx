import {Routes,Route} from "react-router-dom"
import CreateDiaryPage from "./Create Diary/CreateDiaryFormPage.c.diary"
import DiaryLandingPage from "./Landing/DiaryLandingPage.diary"
import DiaryDetailPage from "./Detail Page/DiaryDetailPage.d.diary"
export default function DiaryFile() {
  return (
    <Routes>
        <Route path="/create" element={ <CreateDiaryPage/>}/>
        <Route path="/:id" element={ <DiaryDetailPage/>}/>
        <Route path="/edit/:id" element={ <CreateDiaryPage edit={true}/>}/>
        <Route index element={ <DiaryLandingPage/>}/>
    </Routes>
  )
}
