import { useAppDispatch } from "@/app/ReduxHooks";
import { RedTrcInsertFilters } from "@/app/Slices/TransactionComposeSlice";
import { ItransactionForm } from "@/app/Types/ItransactionForm";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import { useTrackChanges } from "@/Hooks/Common/useTrackChanges";
import useFetchTransactionDetailsTobeUpdated from "@/Hooks/Transactions/useGetTransactoionDetailsTobeUpdated";
import { Button } from "@/shdcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shdcn/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { FC, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

const FormDialogComponents: FC<{
  elm: string;
  submitCb: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
  isPrint:boolean;
  disabled?:boolean
}> = ({ elm, isLoading, submitCb,isPrint,disabled }) => {
  const dispatch =useAppDispatch();
  const { formState: { isValid }} = useFormContext();
  return (
    <Dialog>
      <DialogTrigger disabled={disabled||!isValid}>
        <Button
          disabled={!isValid}
          type="button"
          className={`active:scale-95 transition-all   text-white hover:text-white hover:bg-[var(--darker)] ${
            isPrint
              ? "bg-dark hover:bg-dark "
              : "bg-light dark:bg-transparent text-dark dark:text-white hover:text-dark border-2 border-dark hover:bg-[var(--primary)]"
          }
           `}
        >
          {elm}
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-darker dark:text-white">
        <DialogHeader>
          <DialogTitle>Confirmation?</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this transaction
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              type="button"
              className="active:scale-95 transition-all w-full  text-black hover:text-black border-2 hover:border-[var(--darker)] border-[var(--dark)]"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="active:scale-95 transition-all my-2  text-white hover:text-white hover:bg-[var(--darker)] bg-[var(--dark)]"
            onClick={() => {
              if (isPrint)  dispatch(RedTrcInsertFilters({isPrint:true}))
              else { dispatch(RedTrcInsertFilters({isPrint:false}))}
            setTimeout(() => {
              submitCb.current?.click();
            }, 300);
            }}
          >
            {isLoading ? <RequestLoading size="12" /> : "Confirm Transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TransactionComposerFooter: FC<{
  edit?:boolean
  isLoading: boolean;
}> = ({ isLoading,edit }) => {
  const form =useFormContext<ItransactionForm>()
  const formState=form.watch()
  const {isSuccess,isLoading:isFetching} = useFetchTransactionDetailsTobeUpdated(false)
  const {changes,UpdateState} =useTrackChanges(formState);
  
  useEffect(() => {
    if(isSuccess && edit && !isFetching){ UpdateState(formState)}
    }, [edit,isSuccess,isFetching])

  
  const button = useRef<HTMLButtonElement>(null);
  return (
    <div className="pt-5 flex justify-end gap-x-4">
      
          <FormDialogComponents
          submitCb={button}
          elm={"Confirm and Print"}
          key={"Confirm and Print"}
          isLoading={isLoading}
          disabled = {edit && !changes}
          isPrint ={true}
            />
          <FormDialogComponents
          submitCb={button}
          elm={"Confirm and save"}
          key={"Confirm and save"}
          disabled = {edit && !changes}
          isLoading={isLoading}
          isPrint ={false}
            />
      <button ref={button} hidden></button>
    </div>
  );
};

export default TransactionComposerFooter;
