import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import UpdateTransaction from "../../Api/Transaction/Transaction Compose/EditTransaction.api";
import { ItransactionForm } from "@/app/Types/ItransactionForm";
import toast from "react-hot-toast";
import { RedTrcClearData } from "@/app/Slices/TransactionComposeSlice";
import { useAppDispatch } from "@/app/ReduxHooks";

export default function useUpdateTransaction() {
  const invoice = useParams().invoice || "";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["Transaction", invoice, "update"],
    mutationFn: (payload: ItransactionForm) =>
      UpdateTransaction(invoice, payload),
    onSuccess() {
      toast.success("Transaction updated successfully!");
      navigate("/transactions");
      dispatch(RedTrcClearData());
    },
    onError() {
      toast.error(
        "An error occurred while updating transaction. Please try again."
      );
    },
  });
}
