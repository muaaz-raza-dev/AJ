import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shdcn/components/ui/dialog";
import useFetchDetailedDiary from "@/Hooks/Diary/useFetchDetailedDiary";

export default function ImagesSection() {
  const { data } = useFetchDetailedDiary();
  const q = data?.payload;
  return (
    <div className="flex gap-4 border-b pb-4">
      {q?.images.map((img) => {
        return (
          <EachImageDialog src={img}>
            <img
              src={img}
              alt="image"
              className="w-28 h-28 rounded-md hover:opacity-85 transition-opacity object-contain bg-box"
            />
          </EachImageDialog>
        );
      })}
    </div>
  );
}

const EachImageDialog = ({
  children,
  src,
}: {
  children: ReactNode;
  src: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" bg-white h-[90vh] w-[90vw]">
        <img src={src} className="w-full h-full object-contain" />
      </DialogContent>
    </Dialog>
  );
};
