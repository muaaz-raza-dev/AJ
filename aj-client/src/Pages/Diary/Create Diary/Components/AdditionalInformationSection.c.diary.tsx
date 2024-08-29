import ClassInformation from "./ClassInformation.c.diary";
import DiaryDate from "./DiaryDate.c.diary";
import SectionInformation from "./SectionInformation.c.diary";
import TagInformationSelection from "./TagInformationSelection.c.diary";

export default function SecondaryInformation() {
  return (
    
    <section className="flex flex-col w-full gap-2">
    <div className="bg-box p-2 py-4 rounded-md">
      <TagInformationSelection/>
    </div>
    <div className="bg-box p-2 py-4 rounded-md">
      <ClassInformation/>
    </div>
    <div className="bg-box p-2 py-4 rounded-md">
      <SectionInformation/>
    </div>
    <div className="bg-box p-2 py-4 rounded-md">
      <DiaryDate/>
    </div>
    </section>
  );
}
