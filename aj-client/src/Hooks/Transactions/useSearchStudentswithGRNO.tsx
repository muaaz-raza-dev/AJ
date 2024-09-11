import SearchStudentsForTransaction from "@/Api/Transaction/Transaction Compose/SearchStudentsforTransacton.api";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { RedTrcInsertFilters } from "@/app/Slices/TransactionComposeSlice";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";

const useSearchStudentswithGRNO = (edit: boolean = false) => {
  const dispatch = useAppDispatch();
  const form = useFormContext();
  const { FeeInfo } = useAppSelector((s) => s.trComposeFilters);
  return useMutation({
    mutationKey: "Search",
    mutationFn: (GRNO: string) => {
      dispatch(RedTrcInsertFilters({ isLoading: true }));
      return SearchStudentsForTransaction(GRNO);
    },
    onSuccess({ payload }) {
      if(!edit){form.setValue("Invoice", payload.Invoice);}
      const FeeInfo_payload: {
        Purposes: {value:string,feeTitle:string,label:string,feeFrequency:"One Time"|"Custom"|"Yearly"|"Monthly";sessionId:string}[];
        Amounts: { [key: string]: number };
        Dates: { [key: string]: { [key: string]: string[] } };
      } = { Purposes: [], Amounts: {}, Dates: {} };

      if (edit) {
        const allFeePurposesId = FeeInfo.Purposes.map((e) => e.value);
        FeeInfo_payload.Purposes = payload.FeeInfo.Purposes.filter(
          (pr) => !allFeePurposesId.includes(pr.value)
        ).concat(FeeInfo.Purposes);
        FeeInfo_payload.Amounts = {
          ...payload.FeeInfo.Amounts,
          ...FeeInfo.Amounts,
        };

        Object.entries(payload.FeeInfo.Dates).forEach((e) => {
          if (Object.keys(FeeInfo.Dates).includes(e[0])) {
            Object.entries(e[1]).forEach((date) => {
              if (Object.keys(FeeInfo.Dates[e[0]]).includes(date[0])) {
                FeeInfo_payload.Dates[e[0]] = {[date[0]]:[
                  ...new Set([...date[1], ...FeeInfo.Dates[e[0]][date[0]]]),
                ]};
              } else FeeInfo_payload.Dates[e[0]][date[0]] = date[1];
            });
          } else FeeInfo_payload.Dates[e[0]] = e[1];
        });
      }

      dispatch(
        RedTrcInsertFilters({
          FeeInfo:edit? FeeInfo_payload : payload.FeeInfo ,
          StudentInfo: payload.StudentInfo,
          ClassbasedFeeInfo: payload.ClassbasedFeeInfo,
          ...(edit?{}:{Invoice: payload.Invoice,}),
          isLoading: false,
          Dues: payload.Dues,
        })
      );

    },
    onError({response:{data:{payload:{Invoice}}}}) {
      if(!edit&&Invoice)form.setValue("Invoice", Invoice);
      const defaultf: any = {};
      dispatch(RedTrcInsertFilters({ StudentInfo: defaultf, isLoading: false }));
    },
  });
};

export default useSearchStudentswithGRNO;
