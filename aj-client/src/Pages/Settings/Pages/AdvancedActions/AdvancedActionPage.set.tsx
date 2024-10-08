import useGetAdvancedSettings from "@/Hooks/Settings/useGetAdvancedSettings";
import AutoGRAction from "./AutoGRAction.set";
import SortGRAction from "./SortGRAction.set";
import NotFoundHandler from "@/Global/Middleware Hooks/NotFoundHandler";
import RestrictLoginAction from "./RestrictLoginAction.set";
import RestrictStdLogin from "./RestrictStdLogin.set";

const AdvancedActionPage = () => {
  const { isLoading, isError, error } = useGetAdvancedSettings();

  return (
    <NotFoundHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
      ErrorPageProps={{
        title: "Error finding advanced settings",
        message: "Try again later.",
      }}
    >
      <main className="flex flex-col gap-4">
        <AutoGRAction />
        <SortGRAction />
        <RestrictLoginAction />
        <RestrictStdLogin />
      </main>
    </NotFoundHandler>
  );
};

export default AdvancedActionPage;
