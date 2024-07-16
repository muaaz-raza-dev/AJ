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

const FormDialogComponents:FC<{elm:string;submitCb:any ;isLoading:boolean,PrintFn:()=>void}>=({elm,isLoading,PrintFn,submitCb})=> {
 let {formState:{isValid}} =useFormContext()
 let isPrint = elm.toLowerCase().includes("print")
  return (
    <Dialog >
      <DialogTrigger disabled={!isValid}>
        <Button
        disabled={!isValid}
          type="button"
          className={`active:scale-95 transition-all  text-white hover:text-white hover:bg-[var(--darker)] ${isPrint?"bg-dark hover:bg-dark":"bg-[var(--primary)] text-dark hover:text-dark border-2 border-dark hover:bg-[var(--primary)]"}
           `}
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
              className="active:scale-95 transition-all  text-white hover:text-white hover:bg-[var(--darker)] bg-[var(--dark)]"
              onClick={()=>{if(isPrint) {PrintFn()}
            else submitCb.click()
            }}
            >
              {isLoading? <RequestLoading size="12"/>:"Confirm Transaction"
            }
            </Button>
       
        </DialogFooter>
      </DialogContent> 
    </Dialog>
  );
}

const TransactionComposerFooter :FC<{isLoading:boolean,PrintFn:()=>void}> = ({isLoading,PrintFn}) => {
  let button = useRef<HTMLButtonElement>(null)
  return (
    <div className="pt-5 flex justify-end gap-x-4">
      {["Confirm and Print ", "Confirm transaction"].map((elm) => {
        return <FormDialogComponents submitCb={button.current} elm={elm} key={elm} isLoading={isLoading} PrintFn={PrintFn}/>
      })}
      <button ref={button} hidden></button>
    </div>
  );
};

export default TransactionComposerFooter;
