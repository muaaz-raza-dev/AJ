import { Idiary } from "@/app/Types/Idiary";
import useFetchDetailedDiary from "@/Hooks/Diary/useFetchDetailedDiary";
import { Button } from "@/shdcn/components/ui/button";
import moment from "moment";
import { FC, ReactNode } from "react";
import { FaEye, FaRegEdit} from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shdcn/components/ui/sheet";
import DiaryDeleteButton from "./DiaryDeleteButton.d.diary";
import { Link } from "react-router-dom";

export default function InfoBar() {
  const { data } = useFetchDetailedDiary();
  const q = data?.payload;
  return (
    <div className="flex justify-between border-b pb-4 flex-wrap gap-2">
      <div className="flex flex-col ">
        <SeenByDetailSheet data={q}>
          <div className="flex gap-2 items-center text-gray-700 text-sm">
            <FaEye/>
          <p className="hFont text-gray-800  ">
            {q?.seenBy.length} Views
          </p>
          </div>
        </SeenByDetailSheet>
        <div className="flex gap-2 hFont">
          Published By : <b> {q?.publishedBy.Name}</b>
        </div>
        <b className=" bg-dark w-max px-4 text-white rounded">
          {moment(q?.date).format("dddd, DD-MMMM-YYYY")}
        </b>
      </div>
      <div className="flex gap-2 items-end">
        <Link to={`/diary/edit/${q?._id}`}>
        <Button variant={"secondary"} className="font-bold flex gap-2">
          <FaRegEdit /> Update
        </Button>
        </Link>
        <DiaryDeleteButton/>
      </div>
    </div>
  );
}


const SeenByDetailSheet: FC<{ children: ReactNode; data?: Idiary }> = ({
  children,
  data,
}) => {
  return (
    <Sheet>
      <SheetTrigger className="w-max">{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="py-0 my-0">Students Seen details</SheetTitle>
          <SheetDescription>
            <p>The brief detail of students, who seen this diary.</p>
          </SheetDescription>
        </SheetHeader>
        <div className="w-full py-4">
          {data?.seenBy.length==0&& "No Views yet."}
          {data?.seenBy?.map((s, i) => (
            <div
              key={i}
              className="flex gap-2 hFont items-center border-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={s.photo || "/images/sample.png"}
              />
              <p className="text-gray-800 font-bold"> {s.GRNO} </p>
              <p className="text-gray-800">
                {" "}
                {s.FirstName} {s.LastName}{" "}
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
