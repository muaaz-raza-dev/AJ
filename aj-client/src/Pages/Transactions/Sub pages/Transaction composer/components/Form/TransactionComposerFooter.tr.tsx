import { useAppSelector } from "@/app/ReduxHooks";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import useCreateTransaction from "@/Hooks/Transactions/useCreateTransaction";
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
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const FormDialogComponents:FC<{elm:string}>=({elm})=> {
  let {reset} =useFormContext()
  let FormState =useAppSelector(state=>state.trCompose)
  let {mutate,isLoading}= useCreateTransaction(reset)
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          className="active:scale-95 transition-all  text-white hover:text-white hover:bg-[var(--darker)] bg-[var(--dark)]"
        >
          {elm}
        </Button>
      </DialogTrigger>
      <DialogContent>
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
            onClick={()=>{
              if (elm.includes("Print")) {
                
              }
              else{
                mutate(FormState)
              }
            }}
              type="button"
              className="active:scale-95 transition-all  text-white hover:text-white hover:bg-[var(--darker)] bg-[var(--dark)]"
            >
              {isLoading? <RequestLoading size="12"/>:"Confirm Transaction"
            }
            </Button>
       
        </DialogFooter>
      </DialogContent> 
    </Dialog>
  );
}

const TransactionComposerFooter = () => {
  let {Errors} =useAppSelector(state=>state.trCompose)
  return (
    <div className="pt-5 flex justify-end gap-x-4">
      {["Confirm and Print ", "Confirm transaction"].map((elm) => {
        return (Errors? <Button
          type="submit"
          className="active:scale-95 transition-all  text-white hover:text-white hover:bg-[var(--darker)] bg-[var(--dark)]"
        >
          {elm}
        </Button> :<FormDialogComponents key={elm} elm={elm}></FormDialogComponents>);
      })}
    </div>
  );
};

export default TransactionComposerFooter;
