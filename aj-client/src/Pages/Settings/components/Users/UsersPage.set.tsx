import EachUserComp from "./Components/EachUserComp.set";
import ActionBar from "./Components/ActionBar.set";
import useGetUsers from "@/Hooks/Settings/useGetUsers";
import NotFoundHandler from "@/Global/Middleware Hooks/NotFoundHandler";

const UsersPage = () => {
  const { isLoading, data, isError, error } = useGetUsers();
  return (
    <NotFoundHandler
      ErrorPageProps={{
        title: "Something went wrong",
        message: "The server is unable to get the result, Try again later",
        navigate: "/settings",
      }}
      isError={isError}
      isLoading={isLoading}
      error={error}
    >
      <main className="flex flex-col gap-4">
        <ActionBar />
        <section className="flex flex-wrap  gap-3  w-full ">
          {data?.payload.Users.length == 0 && (
            <h1 className="text-center text-gray-600 dark:text-gray-400 text-xl font-medium">
              No users found
            </h1>
          )}
          {data?.payload.Users&&
          data?.payload?.Users?.map((e) => {
            return (
              <EachUserComp
                data={e}
                key={e._id}
                isBlocked={data?.payload?.isTemporaryBlocked || false}
              />
            );
          })}
        </section>
      </main>
    </NotFoundHandler>
  );
};

export default UsersPage;
