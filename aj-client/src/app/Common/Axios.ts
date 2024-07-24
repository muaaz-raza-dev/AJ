import axios from "axios";
import Cookies from "js-cookie";

let Secretkey  =import.meta.env.VITE_APP_SECRET_COOKIE_KEY
 const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_APP_CLOUD_URI}/api`,
    headers:{"token":Cookies.get(Secretkey)}
  });

 export const AxiosUnAuthorized = axios.create({
    baseURL: `${import.meta.env.VITE_APP_CLOUD_URI}/api`,
  });
  export default Axios