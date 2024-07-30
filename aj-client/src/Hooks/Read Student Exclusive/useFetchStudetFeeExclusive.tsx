// import StudentFeeData from "@/Api/Student exclusive/StudentFeeExclusive";
// import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
// import { RedInsertFeeExclusive } from "@/app/Slices/StdExclusiveSlice";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";

// const useFetchStudetFeeExclusive = () => {
//   let { student:GRNO } = useParams();
//   let dispatch = useAppDispatch()
//   let { Year, FeeType } = useAppSelector(
//     (s) => s.stdExclusive.Fees.Filters.AppliedFilters
//   );
//   return useQuery({
//     queryKey: [GRNO, "Fee"],
//     queryFn: () => GRNO&&StudentFeeData(GRNO, FeeType, Year),
//     staleTime:1e3*60*5,refetchOnWindowFocus:false,
//     onSuccess({payload}){
//         dispatch(RedInsertFeeExclusive({isLoading:false,FeeCollection:payload,}))
// },
// onError({response:{data:{message}}}){
//     dispatch(RedInsertFeeExclusive({isLoading:false,isError:message,}))
// },
//     onSettled() {
//         dispatch(RedInsertFeeExclusive({isLoading:false}))
//     },
//   });
// };

// export default useFetchStudetFeeExclusive;
