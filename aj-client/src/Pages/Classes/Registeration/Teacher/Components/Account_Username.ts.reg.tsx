import { useFormContext } from "react-hook-form";
import { FC, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { MdCancel } from "react-icons/md";
import useValidateUsername from "@/Hooks/Teacher&Class/useValidateUsername.api";
import { Tooltip } from "antd";
import { CheckCircle2 } from "lucide-react";
import useGetUserAccountCredits from "@/Hooks/User/useGetUserAccountCredits";

const Account_Username: FC<{ edit?: boolean; fieldName?: string }> = ({
  edit,
  fieldName,
}) => {
  let form = useFormContext();
  const { data: q } = useGetUserAccountCredits(edit);
  const s_username = q?.payload?.username;
  let { data, mutate, isLoading, isSuccess } = useValidateUsername();
  let username = form.watch(fieldName || "account_Details.username");
  let debounced = useDebouncedCallback((value) => {
    if (value) {
      if (edit) {
        if (s_username != value) {
          mutate(value);
        }
      } else {
        mutate(value);
      }
    }
  }, 1000);

  const ValidationComp = useCallback(() => {
    if (username) {
      if (isLoading) {
        return <RequestLoading dark size="20" stroke="3" />;
      } else {
        if (edit && s_username == username) {
          return <Tooltip title="username is already setted.">
          <CheckCircle2 size={20} className="text-green-500" />
        </Tooltip>
        } else {
          if (isSuccess) {
            if (data?.success) {
              return (
                <Tooltip title="username is available">
                  <CheckCircle2 size={20} className="text-green-500" />
                </Tooltip>
              );
            } else {
              return (
                <Tooltip title="username is taken. Try another one">
                  <MdCancel size={20} className="text-red-600" />
                </Tooltip>
              );
            }
          }
        }
      }
    } else {
      return null;
    }
  }, [edit, username, s_username, isLoading, isSuccess, data]);
  return (
    <div className="flex items-center  border border-[#8080806b] dark:border-darker rounded bg-light dark:bg-dark dark:text-white w-full">
      <input
        required
        value={username}
        onChange={({ target: { value } }) => {
          debounced(value);
          form.setValue(fieldName || "usename", value);
        }}
        className=" p-2 w-[85%]  outline-none dark:bg-dark dark:text-white dark:border-darker"
        id="username"
        placeholder="muaaz"
      />
      <div className="flex w-[15%]  items-center justify-end px-6">
        <ValidationComp />
      </div>
    </div>
  );
};

export default Account_Username;
