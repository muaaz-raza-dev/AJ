import { IaccountInfo } from "@/app/Types/IAccountInfo";
import { useTrackChanges } from "@/Hooks/Common/useTrackChanges";
import { Button } from "@/shdcn/components/ui/button";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Switch } from "@/shdcn/components/ui/switch";
import RequestLoading from "@/Global/Loaders/RequestLoding";

const AccountInfoFormSubmit: FC<{ isLoading: boolean;isSuccess:boolean }> = ({ isLoading,isSuccess }) => {
  const { watch } = useFormContext<IaccountInfo>();
  const isLoaded = watch("isLoaded");
  const isVerified = watch("isVerified");
  let payload = {...watch("Info"),...watch("Passwords")};
  const { changes, UpdateState } = useTrackChanges(payload);
  useEffect(() => {
    if (isLoaded||isSuccess) UpdateState(payload);
  }, [isLoaded,isSuccess]);
  const BtnDisableHandler = () => {
    let disable = true;
    if (!isLoading) {
      if(isVerified){
        if (changes) disable = false;
      }
    }
    return disable;
  };
  return (
    <div className="flex items-center  justify-between py-4  gap-3  w-[90%] max-md:w-full">
      <UpdatePasswordToggle />
      <Button
        disabled={BtnDisableHandler()}
        className="text-white bg-dark hover:bg-dark"
      >
        {isLoading ? <RequestLoading stroke="2" size="16" /> : "Update"}
      </Button>
    </div>
  );
};

const UpdatePasswordToggle = () => {
  const { setValue, watch } = useFormContext<IaccountInfo>();
  const isUpdatePassword = watch("isUpdatePassword");
  return (
    <div className="flex items-center dark:text-white border-2 dark:border-darker  w-[30%] max-md:w-[70%] p-4 space-x-2 justify-between rounded-md">
      <div className="">
        <label htmlFor="airplane-mode" className="font-bold ">
          Update Password
        </label>
        <p className="text-gray-600 text-xs">update you account password.</p>
      </div>
      <Switch
        id="airplane-mode"
        className="text-black"
        onCheckedChange={(val) => setValue("isUpdatePassword", val)}
        checked={isUpdatePassword}
      />
    </div>
  );
};
export default AccountInfoFormSubmit;
