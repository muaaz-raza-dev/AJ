import Axios from "@/app/Common/Axios";
import { ClassBasedFeeDetails, IDuesTrCompose } from "@/app/Types/IcomposeTransactionFilters";
import { IstudentExclusive } from "@/app/Types/IStudentExclusive";
import Cookies from "js-cookie";
const SearchStudentsForTransaction = async (GRNO: string) => {
  const Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY;
  const response = await Axios.post<{
    payload: {
      FeeInfo: {
        Purposes: { value: string, feeTitle: string, label: string, feeFrequency: "One Time" | "Custom" | "Yearly" | "Monthly"; sessionId: string }[],
        Dates: { [key: string]: { [key: string]: string[] } },
        Amounts: { [key: string]: number }
      }
      ,Invoice:string,
      Dues:IDuesTrCompose[],
      ClassbasedFeeInfo:ClassBasedFeeDetails,
      StudentInfo:IstudentExclusive

    },
    message:string
  }>("/transactions/search/std", { GRNO }, { headers: { token: Cookies.get(Secretkey) } });
  return response.data;
};

export default SearchStudentsForTransaction;
