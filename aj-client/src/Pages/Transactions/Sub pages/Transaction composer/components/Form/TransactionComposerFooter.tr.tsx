import { useAppDispatch } from "@/app/ReduxHooks";
import { RedTrcInsertFilters } from "@/app/Slices/TransactionComposeSlice";
import RequestLoading from "@/Global/Loaders/RequestLoding";
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
import { FC, useRef } from "react";
import { useFormContext } from "react-hook-form";

const FormDialogComponents: FC<{
  elm: string;
  submitCb: any;
  isLoading: boolean;
  isPrint:boolean
}> = ({ elm, isLoading, submitCb,isPrint }) => {
  let dispatch =useAppDispatch()
  let {
    formState: { isValid },
  } = useFormContext();
  return (
    <Dialog>
      <DialogTrigger disabled={!isValid}>
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
              className="active:scale-95 transition-all  text-black hover:text-black border-2 hover:border-[var(--darker)] border-[var(--dark)]"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            className="active:scale-95 transition-all  text-white hover:text-white hover:bg-[var(--darker)] bg-[var(--dark)]"
            onClick={() => {
              console.log(isPrint);
              if (isPrint)  dispatch(RedTrcInsertFilters({isPrint:true}))
              else { dispatch(RedTrcInsertFilters({isPrint:false}))}
            setTimeout(() => {
              submitCb.click();
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
  isLoading: boolean;
}> = ({ isLoading }) => {
  let button = useRef<HTMLButtonElement>(null);
  return (
    <div className="pt-5 flex justify-end gap-x-4">
      
          <FormDialogComponents
            submitCb={button.current}
            elm={"Confirm and Print"}
            key={"Confirm and Print"}
            isLoading={isLoading}
            isPrint ={true}

          />
          <FormDialogComponents
            submitCb={button.current}
            elm={"Confirm"}
            key={"Confirm"}
            isLoading={isLoading}
            isPrint ={true}

          />
      <button ref={button} hidden></button>
    </div>
  );
};

export default TransactionComposerFooter;
