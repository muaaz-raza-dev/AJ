import Axios from '@/app/Common/Axios'
import Cookies from 'js-cookie'
const SearchStudents = async(q:string,SearchMode:string,Filters:any) => {
   let response =await Axios.post("/students/search",{q,SearchMode,Filters},
   {headers:{"token":Cookies.get(import.meta.env.VITE_APP_SECRET_COOKIE_KEY)}})
   return response.data
}

export default SearchStudents
