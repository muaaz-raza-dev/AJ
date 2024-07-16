import SearchStudentsForTransaction from "@/Api/Transaction/Transaction Compose/SearchStudentsforTransacton.api";
import { useAppDispatch } from "@/app/ReduxHooks";
import { RedTrcInsertFilters } from "@/app/Slices/TransactionComposeSlice";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";

const useSearchStudentswithGRNO = () => {
  let dispatch = useAppDispatch();
  let form =useFormContext()
  return useMutation({
    mutationKey: "Search",
    mutationFn: (GRNO: string) =>{
       dispatch(RedTrcInsertFilters({isLoading:true}))
      return SearchStudentsForTransaction(GRNO)},
    onSuccess({payload}) {
      form.setValue("Invoice",payload.Invoice)
      dispatch( RedTrcInsertFilters({FeeInfo:payload.FeeInfo,StudentInfo:payload.StudentInfo,ClassbasedFeeInfo:payload.ClassbasedFeeInfo ,Invoice:payload.Invoice,isLoading:false}) );
    },
    onError(err:any) {
      form.setValue("Invoice",err.response.data.payload.Invoice)
      let defaultf: any = {};
      dispatch(
        RedTrcInsertFilters({StudentInfo:defaultf,isLoading:false})
      )
    },
  });
};

export default useSearchStudentswithGRNO;
