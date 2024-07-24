import {AxiosUnAuthorized} from "@/app/Common/Axios"
export interface LoginPayload  {usernameOrEmail:string, password:string}
const Login =async({usernameOrEmail, password}:LoginPayload) => {
 let response = await AxiosUnAuthorized.post("/auth/login",{usernameOrEmail,password})
 return response.data
}

export default Login
