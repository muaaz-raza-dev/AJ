import Axios from "@/app/Common/Axios";
import Cookies from "js-cookie";
const SearchStudentsForTransaction = async (GRNO: string) => {
  let Secretkey = import.meta.env.VITE_APP_SECRET_COOKIE_KEY;

  let response = await Axios.post(
    "/transactions/search/std",
    { GRNO },
    { headers: { token: Cookies.get(Secretkey) } }
  );
  return response.data;
};

export default SearchStudentsForTransaction;
