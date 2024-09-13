import { Label } from "@/shdcn/components/ui/label";
import { Input } from "antd";
import ImageUpload from "./ImageUpload.c.diary";
import MainContentEditor from "./MainContentEditor.c.diary";
import { Controller, useFormContext } from "react-hook-form";
import { IdiaryCreate } from "@/app/Types/IdiaryCreate";

export default function ContentSection() {
  const { control } = useFormContext<IdiaryCreate>();
  return (
    <section className="flex gap-4 flex-col w-[65%] max-lg:w-full ">
      <div className="">
        <Label
          htmlFor="title"
          className="hFont font-semibold text-lg dark:text-white "
        >
          Diary Title
        </Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "title is required" }}
          render={({ formState, field }) => {
            return (
              <>
                <Input
                  {...field}
                  id="title"
                  className="w-full dark:bg-dark dark:text-white dark:placeholder:text-gray-400"
                  placeholder="English Home work Diary"
                />
                {formState.errors && (
                  <p className="text-sm text-red-400">
                    {formState.errors.title?.message}
                  </p>
                )}
              </>
            );
          }}
        />
      </div>
      <ImageUpload />
      <MainContentEditor />
    </section>
  );
}
