import FilterLoaderLandingPage from "../Skeleton loader/FilterLoaderLandingPage.diary";
import DiaryCardsSection from "./Components/DiaryCardsSection.diary";
import FilterBar from "./Components/FilterBar.diary";
import useFetchDiaryMeta from "@/Hooks/Diary/useFetchDiaryFiltersMeta";


export default function DiaryLandingPage() {
  const {isLoading} = useFetchDiaryMeta()
  if(isLoading)return <FilterLoaderLandingPage/>
  return (
    <section>
   <FilterBar/>
   <DiaryCardsSection/>
    </section>
  );
}
