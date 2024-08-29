import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ContentSection from "./Components/ContentSection.c.diary";
import { defaultIdiaryCreate, IdiaryCreate } from "@/app/Types/IdiaryCreate";
import SecondaryInformation from "./Components/AdditionalInformationSection.c.diary";
import useUploadMultipleMedia from "@/Hooks/Global/useUploadMultipleMedia";
import SubmitDiary from "./Components/DiarySubmit.c.diary";
import toast from "react-hot-toast";
import useCreateDiary from "@/Hooks/Diary/useCreateDiary";

export default function CreateDiaryPage() {
  const form = useForm<IdiaryCreate>({ defaultValues: defaultIdiaryCreate });
  const { upload, isLoading } = useUploadMultipleMedia();
  const { mutate, isLoading: isMutating } = useCreateDiary(form.reset);
  function ValidateFields() {
    const values = form.watch();
    if (!values.classes.length || !values.content) {
      toast.error("Must fill all the required fields");
      return false;
    }
    return true;
  }

  function onSuccess(images: string[]) {
    form.setValue("images", images);
    mutate({ ...form.watch(), images });
  }
  const formSubmit: SubmitHandler<IdiaryCreate> = (data) => {
    const valid = ValidateFields();
    if (valid) {
      if (
        data.images.length &&
        data.images.some((img) => img instanceof File)
      ) {
        upload(
          data.images.filter((img) => img instanceof File) as File[],
          onSuccess
        );
      } else {
        mutate(data);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)} className="py-8">
        <main className="flex gap-1 justify-between w-full">
          <ContentSection />
          <section className="flex flex-col w-[33%]  gap-2">
            <SecondaryInformation />
            <SubmitDiary isLoading={isLoading || isMutating} />
          </section>
        </main>
      </form>
    </FormProvider>
  );
}
