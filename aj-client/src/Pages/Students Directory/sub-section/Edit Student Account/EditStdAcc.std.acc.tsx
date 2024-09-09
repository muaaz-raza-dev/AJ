import RequestLoading from "@/Global/Loaders/RequestLoding";
import useResetStdAccountPassword from "@/Hooks/Read Student Exclusive/useResetStdAccountPassword";
import { Button } from "@/shdcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shdcn/components/ui/dialog";
import generatePassword from "@/utils/generatePassword";
import { Input } from "antd";
import { useState } from "react";
import { FaKey } from "react-icons/fa";

export function EditStdAccountPassword({Account_id}:{Account_id:string}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState<string>("");
  const {mutate,isLoading} = useResetStdAccountPassword(setOpen,setPassword)

  const handleGeneratePassword = () => {
    try {
      const password = generatePassword();
      setPassword(password);
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open)=>!isLoading&&setOpen(open)}>
      <DialogTrigger>
        <Button className="flex gap-2 bg-dark text-white hover:bg-dark">
          <FaKey /> Edit Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student account password</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input.Password
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Button variant={"outline"} onClick={handleGeneratePassword}>
            Generate
          </Button>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Button disabled={!password} onClick={()=>password&&mutate({Account_id,password})} className="bg-darker hover:bg-darker text-white">
            {isLoading?
            <RequestLoading size="16" stroke="2" /> : 
            "Update"
            }
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
