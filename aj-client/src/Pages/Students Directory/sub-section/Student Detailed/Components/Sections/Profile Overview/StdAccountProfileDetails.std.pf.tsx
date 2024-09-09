import { Button } from "@/shdcn/components/ui/button";
import StdProfileNavigationHeader from "../Sub-Pages/StdProfileNavigationHeader.std.pf";
import { EachKVBlock } from "../Sub-Pages/StudentDetailsKeyValuePairs.std.pf";
import useFetchStudentAccountInfo from "@/Hooks/Read Student Exclusive/useFetchStudentAccountInfo";
import AccountInfoLoader from "./AccountInfoLoader.std.pf";
import clsx from "clsx";
import moment from "moment";
import useToggleStdAccountRestriction from "@/Hooks/Read Student Exclusive/useToggleStdAccountRestriction";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { EditStdAccountPassword } from "@/Pages/Students Directory/sub-section/Edit Student Account/EditStdAcc.std.acc";
export default function StdAccountProfileDetails() {
  const { isLoading, isError, data, error } = useFetchStudentAccountInfo();
  const { mutate: block, isLoading: isBlocking } =useToggleStdAccountRestriction();
  if (isLoading) return <AccountInfoLoader />;
  const q = data?.payload;
  const Error = error as any;
  return (
    <div className="bg-box rounded-md flex flex-col gap-2 pb-3">
      <StdProfileNavigationHeader title={"Student Account Detail"} />
      {isError ? (
        Error.response.status == 404 && <ErrrorFallback />
      ) : (
        <>
          <section className={`flex gap-2 flex-wrap px-2 `}>
            <EachKVBlock label="Name" value={q?.Name} />
            <EachKVBlock label="account email" value={q?.email} />
            <EachKVBlock
              label="Last login"
              value={q?.LastLogin ? moment(q?.LastLogin).fromNow() : null}
            />
            <EachKVBlock
              labelStyle={clsx(
                q?.isBlocked ? "!text-red-600" : "text-green-600"
              )}
              label="Status"
              value={q?.isBlocked ? "Blocked" : "Active"}
            />
          </section>
          <div className="p-2 px-6 w-full flex justify-end gap-3 ">
            {q?._id&&<EditStdAccountPassword Account_id={q?._id}/>}

            <Button
              onClick={() => q?._id && block(q?._id)}
              className={clsx(
                "gap-1",
                q?.isBlocked && "hover:bg-[var(--success)] bg-[var(--success)]"
              )}
              variant={"destructive"}
            >
              {isBlocking ? (
                <RequestLoading dark stroke="3" size="18" />
              ) : !q?.isBlocked ? (
                "Block"
              ) : (
                <p className="text-black font-semibold">Unblock</p>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function ErrrorFallback() {
  return (
    <>
      <h1 className="text-gray-700 font-bold text-center pt-4 text-xl hFont">
        Account not exist
      </h1>
    </>
  );
}
