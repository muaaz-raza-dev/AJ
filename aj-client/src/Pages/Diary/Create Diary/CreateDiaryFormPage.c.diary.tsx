import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ContentSection from "./Components/ContentSection.c.diary";
import { defaultIdiaryCreate, IdiaryCreate } from "@/app/Types/IdiaryCreate";
import SecondaryInformation from "./Components/AdditionalInformationSection.c.diary";
import useUploadMultipleMedia from "@/Hooks/Global/useUploadMultipleMedia";
import SubmitDiary from "./Components/DiarySubmit.c.diary";
import toast from "react-hot-toast";
import useCreateDiary from "@/Hooks/Diary/useCreateDiary";
import useRequestEditDiary from "@/Hooks/Diary/useRequestEditDiary";
import NotFoundHandler from "@/Global/Middleware Hooks/NotFoundHandler";
import useEditDiary from "@/Hooks/Diary/useEditDiary";

export default function CreateDiaryPage({ edit = false }: { edit?: boolean }) {
  const form = useForm<IdiaryCreate>({ defaultValues: defaultIdiaryCreate });
  const { isLoading: isFetchingPrevData,error,isError } = useRequestEditDiary(edit || false,form.reset);
  const { upload, isLoading } = useUploadMultipleMedia();
  const { mutate, isLoading: isMutating } = useCreateDiary(form.reset);
  const {mutate:Edit,isLoading:isEditing} = useEditDiary();

  function ValidateFields() {
    const values = form.watch();
    if (!values.classes.length || !values.content) {
      toast.error("Must fill all the required fields");
      return false;
    }
    return true;
  }

  function onSuccess(images: string[]) {
    const Images:string[] =  form.watch("images").filter(img=>typeof img == "string").concat(images) as string[]
   form.setValue("images",Images);
   edit? Edit({ ...form.watch(),images: Images }) : mutate({ ...form.watch(),images:Images });
  }

  const formSubmit: SubmitHandler<IdiaryCreate> = (data) => {
    const valid = ValidateFields();
    if (valid) {
      if (
        data.images.length &&
        data.images.some((img) => img instanceof File)
      ) {
        upload(
          data.images.filter((img) => img instanceof File) as File[],onSuccess);
      } else {
        edit ? Edit(data) : mutate(data);
      }
    }
  };
  return (
    <NotFoundHandler isLoading={edit&&isFetchingPrevData} isError={edit&&isError} error={error}>
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)} className="py-8">
        <main className="flex justify-between gap-2 w-full max-lg:flex-col">
          <ContentSection />
          <section className="flex flex-col w-[33%]  max-lg:w-full gap-2">
            <SecondaryInformation/>
            <SubmitDiary isLoading={isLoading || isMutating||isEditing} edit={edit} />
          </section>
        </main>
      </form>
    </FormProvider>
    </NotFoundHandler>
  );
}
