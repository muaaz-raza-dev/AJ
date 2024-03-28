import RequestLoading from "@/Global/Loaders/RequestLoding";
import { FC } from "react";


const RegisterationFormSumbit:FC<{isLoading:boolean}> = ({isLoading}) => {

  return (
    <div className="w-full items-center justify-end gap-x-2 flex">
      <button type="button" className="rounded-2xl px-4 py-1.5 border DarkText hover:tracking-widest transition-all duration-150 border-[var(--dark)] hFont">
        Save as draft
      </button>
      <button type="submit" className="rounded-2xl transition-colors duration-150 px-4 py-1.5 bg-[var(--dark)] border-[var(--dark)] border text-white hFont 
      hover:text-[var(--dark)] hover:bg-[var(--box)]">
        {isLoading? <RequestLoading/>:"Register"
        }
      </button>
    </div>
  );
};

export default RegisterationFormSumbit;
