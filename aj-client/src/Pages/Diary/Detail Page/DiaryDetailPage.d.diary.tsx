import "react-quill/dist/quill.snow.css"; // Import Quill styles
import InfoBar from "./InfoBar.d.diary";
import ImagesSection from "./ImagesSection.d.diary";
import ClassInfoBar from "./ClassInfoBar.d.diary";
import useFetchDetailedDiary from "@/Hooks/Diary/useFetchDetailedDiary";
import DOMPurify from "dompurify"; 
export default function DiaryDetailPage() {
  const { isLoading, data } = useFetchDetailedDiary();

  
  if (isLoading){ return <>loading...</>;}
  const q =data?.payload
  return (
    <main className="flex gap-4 flex-col m-8 my-4">
      <h1 className="hFont text-4xl antialiased font-bold text-gray-800">
        {q?.title}
      </h1>
      <InfoBar />
      <ClassInfoBar />
      <ImagesSection />
      <div className="border-b pb-4 ql-editor" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(q?.content || "")}}>

      </div>

        {q?.tags.length?
      <div className="">
        <h1 className="hFont gap-2 pb-1">Tags :</h1>
        <div className="flex gap-2">
            {q?.tags.map(t=><span className=" bg-blue-100 text-blue-800 rounded-md px-2 py-1 mr-2">{t}</span>)}
        </div>
      </div> : null}
    </main>
  );
}
